import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameState } from '../../services/game-state';
import { AssetLoaderService } from '../../services/asset-loader.service';
import { Application, Assets, Container, Sprite, Text, Graphics, TextStyle, Texture } from 'pixi.js';

@Component({
    // ... (Metadata remains same, just ensuring import is there)
    selector: 'app-final-cutscene',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="w-full h-screen bg-black overflow-hidden">
        <div #pixiContainer class="w-full h-full"></div>
    </div>
  `,
    styles: [`
    :host { display: block; }
  `]
})
export class FinalCutsceneComponent implements AfterViewInit, OnDestroy {
    @ViewChild('pixiContainer') pixiContainer!: ElementRef<HTMLDivElement>;

    private app!: Application;

    // Layers
    private bgLayer!: Container;
    private gameContainer!: Container;
    private charLayer!: Container;
    private uiLayer!: Container;
    private overlayLayer!: Container;

    // Sprites & Objects
    private snehal!: Sprite;
    private apoorv!: Sprite;
    private bouquet!: Sprite;
    private dialogueBox!: Graphics;
    private dialogueText!: Text;
    private yesBtn!: Container;
    private noBtn!: Container;
    private endMenu!: Container;

    // State
    private dialogueIndex = 0;
    private dialogueLines: string[] = [];

    // Assets Map
    private assets: Record<string, Texture> = {};

    constructor(
        private router: Router,
        public gameState: GameState,
        public assetLoader: AssetLoaderService
    ) {
    }

    private initDialogueLines() {
        const words = this.gameState.memoryWords();
        console.log("FinalCutscene Words:", words);
        const joinedWords = words.join(', ') || "warmth, depth, sunshine";

        this.dialogueLines = [
            "Explorer Snehal… you made it.",
            "The sky looks extra soft tonight.",
            "I hope the adventure was fun, because I’m genuinely proud of you.",
            `And you chose, ${joinedWords}`,
            "That’s you. And that’s only a small piece of what I see in you.",
            "Never forget this, you are deeply loved.",
            "You cleared the foggy forest. Promise me you’ll choose your peace first.",
            "Because you matter to me the most.",
            "You conquered the Vibe Detector.",
            "I hope that clarity follows you, everywhere.",
            "And I wanted to give you that bouquet again, virtual this time.",
            "",
            "Finally, I’ve been carrying something in my chest.",
            "I dont need loud love for days. I want steady love for years.",
            "So here’s my real question…",
            "Will you hold my hand, and be mine, forever?"
        ];
    }

    async ngAfterViewInit() {
        this.initDialogueLines();
        this.gameState.showHud.set(false);
        this.app = new Application();

        await this.app.init({
            resizeTo: window,
            backgroundColor: 0x000000,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        this.pixiContainer.nativeElement.appendChild(this.app.canvas);

        await this.loadAssets();
        this.setupScene();
        this.renderBeat(0);
        this.handleResize();
    }

    async loadAssets() {
        // Direct absolute paths with cache bust, resolved via AssetLoader
        const t = Date.now();

        // Helper to add cache bust
        const getUrl = (path: string) => `${this.assetLoader.get(path)}?t=${t}`;

        const bgUrl = getUrl('bg_observatory.jpg');
        const snehalUrl = getUrl('snehal_happy.png');
        const snehalBouquetUrl = getUrl('snehal_holding_bouquet.png');

        const apoorvUrl = getUrl('apoorv_final.png');
        const proposalUrl = getUrl('proposal.png');
        const bouquetUrl = getUrl('bouquet_sunflower_rose.png');
        const endingUrl = getUrl('valentines_end.png');

        console.log("Loading assets from:", bgUrl); // Diagnostic log

        try {
            const bgTex = await Assets.load(bgUrl);
            this.assets['bg'] = bgTex;
        } catch (e) { console.error("Failed to load bg", e); }

        try { this.assets['snehal'] = await Assets.load(snehalUrl); } catch (e) { }
        try { this.assets['snehal_bouquet'] = await Assets.load(snehalBouquetUrl); } catch (e) { }

        try { this.assets['apoorv_happy'] = await Assets.load(apoorvUrl); } catch (e) { }
        try { this.assets['apoorv_kneel'] = await Assets.load(proposalUrl); } catch (e) { }

        // try { this.assets['bouquet'] = await Assets.load(bouquetUrl); } catch (e) { }
        try { this.assets['ending'] = await Assets.load(endingUrl); } catch (e) { }
    }

    setupScene() {
        this.bgLayer = new Container();
        this.gameContainer = new Container();
        this.charLayer = new Container();
        this.uiLayer = new Container();
        this.overlayLayer = new Container();

        this.gameContainer.addChild(this.charLayer, this.uiLayer, this.overlayLayer);
        this.app.stage.addChild(this.bgLayer, this.gameContainer);

        // Background
        if (this.assets['bg']) {
            const bg = Sprite.from(this.assets['bg']);
            bg.anchor.set(0.5);
            this.bgLayer.addChild(bg);
        } else {
            console.warn("Using Fallback BG (Red)");
            const bg = new Graphics();
            bg.rect(-50, -50, 100, 100);
            bg.fill(0x550000);
            this.bgLayer.addChild(bg);
        }

        // Characters (Scaled specific to request)
        // Snehal
        if (this.assets['snehal']) {
            this.snehal = Sprite.from(this.assets['snehal']);
            const scale = Math.min(720 / this.snehal.texture.height * 0.45, 1);
            this.snehal.scale.set(scale);
        } else {
            this.snehal = new Sprite(Texture.WHITE);
            this.snehal.tint = 0xFF69B4;
            this.snehal.width = 100; this.snehal.height = 200;
        }
        this.snehal.anchor.set(0.5, 1);
        this.snehal.x = 1280 * 0.72;
        this.snehal.y = 600; // Floor level
        this.snehal.visible = false;
        this.charLayer.addChild(this.snehal);

        // Apoorv
        if (this.assets['apoorv_happy']) {
            this.apoorv = Sprite.from(this.assets['apoorv_happy']);
            const h = this.apoorv.texture.height;
            const baseH = 720 * 0.45;
            const targetH = baseH + 30; // 30px bigger as requested
            const scale = Math.min(targetH / h, 1.5); // Cap scale reasonable
            this.apoorv.scale.set(scale);
        } else {
            this.apoorv = new Sprite(Texture.WHITE);
            this.apoorv.tint = 0x87CEEB;
            this.apoorv.width = 100; this.apoorv.height = 200;
        }
        this.apoorv.anchor.set(0.5, 1);
        this.apoorv.x = 1280 * 0.28;
        this.apoorv.y = 600; // Floor level
        this.apoorv.visible = false;
        this.charLayer.addChild(this.apoorv);

        // Bouquet
        if (this.assets['bouquet']) {
            this.bouquet = Sprite.from(this.assets['bouquet']);
            this.bouquet.scale.set(0.5);
        } else {
            this.bouquet = new Sprite(Texture.WHITE);
            this.bouquet.tint = 0xFFD700;
            this.bouquet.width = 80; this.bouquet.height = 80;
        }
        this.bouquet.anchor.set(0.5, 0.5);
        this.bouquet.x = 1280 * 0.68;
        this.bouquet.y = 720 * 0.50;
        this.bouquet.visible = false;
        this.uiLayer.addChild(this.bouquet);

        // Dialogue Box
        this.dialogueBox = new Graphics();
        this.dialogueBox.roundRect(0, 0, 1280 * 0.88, 150, 20);
        this.dialogueBox.fill({ color: 0xffffff, alpha: 0.9 });
        this.dialogueBox.stroke({ width: 4, color: 0xFFC0CB });
        this.dialogueBox.x = (1280 - (1280 * 0.88)) / 2;
        this.dialogueBox.y = 720 * 0.76;
        this.uiLayer.addChild(this.dialogueBox);

        // Dialogue Text
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 32,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#4a4a4a',
            wordWrap: true,
            wordWrapWidth: 1280 * 0.80,
            align: 'center',
            leading: 4
        });

        this.dialogueText = new Text({ text: '', style });
        this.dialogueText.anchor.set(0.5, 0.5);
        this.dialogueText.x = 1280 / 2;
        this.dialogueText.y = this.dialogueBox.y + 75;
        this.uiLayer.addChild(this.dialogueText);

        // Interaction
        const hitArea = new Graphics();
        hitArea.rect(-5000, -5000, 10000, 10000);
        hitArea.fill({ color: 0x000000, alpha: 0.0001 });
        hitArea.eventMode = 'static';
        hitArea.cursor = 'pointer';
        hitArea.on('pointerdown', () => this.advanceDialogue());
        this.bgLayer.addChild(hitArea);

        this.createButtons();
    }

    createButtons() {
        // Yes Button
        this.yesBtn = new Container();
        const yesBg = new Graphics();
        yesBg.roundRect(0, 0, 250, 80, 40);
        yesBg.fill(0xE91E63); // Pink
        yesBg.stroke({ width: 4, color: 0xFFFFFF });

        const yesStyle = new TextStyle({
            fontFamily: 'Georgia',
            fontSize: 36,
            fontWeight: 'bold',
            fontStyle: 'italic',
            fill: 'white',
            dropShadow: {
                color: '#000000',
                blur: 4,
                angle: Math.PI / 6,
                distance: 2,
            },
        });

        const yesText = new Text({ text: 'Yes, I will', style: yesStyle });
        yesText.anchor.set(0.5);
        yesText.x = 125; yesText.y = 40;
        this.yesBtn.addChild(yesBg, yesText);

        this.yesBtn.x = 1280 / 2 - 200; // Adjusted for larger size
        this.yesBtn.y = 520;
        this.yesBtn.eventMode = 'static';
        this.yesBtn.cursor = 'pointer';
        this.yesBtn.visible = false;

        this.yesBtn.on('pointerdown', (e) => {
            e.stopPropagation();
            this.handleYes();
        });

        // No Button
        this.noBtn = new Container();
        const noBg = new Graphics();
        noBg.roundRect(0, 0, 150, 60, 30);
        noBg.fill(0x808080);

        const noStyle = new TextStyle({
            fontFamily: 'Georgia',
            fontSize: 28,
            fontStyle: 'italic',
            fill: 'white'
        });

        const noText = new Text({ text: 'No', style: noStyle });
        noText.anchor.set(0.5);
        noText.x = 75; noText.y = 30;
        this.noBtn.addChild(noBg, noText);

        this.noBtn.x = 1280 / 2 + 150;
        this.noBtn.y = 530;
        this.noBtn.eventMode = 'static';
        this.noBtn.visible = false;

        this.app.ticker.add(() => {
            if (!this.noBtn.visible) return;

            const pointer = this.app.renderer.events.pointer;
            const globalMouse = { x: pointer.x, y: pointer.y };
            const localMouse = this.gameContainer.toLocal(globalMouse);

            const btnCenterX = this.noBtn.x + 75;
            const btnCenterY = this.noBtn.y + 30;

            const dx = localMouse.x - btnCenterX;
            const dy = localMouse.y - btnCenterY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const triggerDistance = 100; // Only move when cursor lands on it

            if (dist < triggerDistance) {
                const angle = Math.atan2(dy, dx);
                // Move away smoothly
                this.noBtn.x -= Math.cos(angle) * 8;
                this.noBtn.y -= Math.sin(angle) * 8;

                // Keep within reasonable bounds so it doesn't vanish instantly
                this.noBtn.x = Math.max(50, Math.min(1230, this.noBtn.x));
                this.noBtn.y = Math.max(50, Math.min(670, this.noBtn.y));
            }
        });

        this.uiLayer.addChild(this.yesBtn, this.noBtn);
    }

    renderBeat(index: number) {
        if (index >= this.dialogueLines.length) return;

        const text = this.dialogueLines[index];
        this.dialogueText.text = text;

        this.dialogueText.alpha = 0;
        const fadeIn = () => {
            if (this.dialogueText.alpha < 1) {
                this.dialogueText.alpha += 0.05;
                requestAnimationFrame(fadeIn);
            }
        };
        fadeIn();

        if (index === 0) {
            if (this.snehal) this.snehal.visible = true;
        }

        if (index === 1) {
            if (this.apoorv) {
                this.apoorv.visible = true;
                this.apoorv.alpha = 0;
                const fadeInChar = () => {
                    this.apoorv.alpha += 0.05;
                    if (this.apoorv.alpha < 1) requestAnimationFrame(fadeInChar);
                };
                fadeInChar();
            }
        }

        if (index === 11) {
            // Beat 11: Snehal receives bouquet - Swap texture immediately, no standalone bouquet
            if (this.assets['snehal_bouquet']) {
                this.snehal.texture = this.assets['snehal_bouquet'];
            }
        }

        if (index === 15) {
            // Proposal Beat
            if (this.apoorv) {
                if (this.assets['apoorv_kneel']) {
                    this.apoorv.texture = this.assets['apoorv_kneel'];
                } else {
                    if (this.apoorv instanceof Sprite && this.apoorv.texture === Texture.WHITE) {
                        this.apoorv.height = 150;
                    }
                }

                // Centered and Original Size
                this.apoorv.anchor.set(0.5, 1);
                this.apoorv.x = 1280 / 2;
                this.apoorv.y = 600 + 40;

                this.apoorv.scale.set(1);
            }

            // "Only that to be on screen" - Hide Snehal for proposal focus
            if (this.snehal) this.snehal.visible = false;

            setTimeout(() => {
                this.yesBtn.visible = true;
                this.noBtn.visible = true;
            }, 1000);
        }
    }

    advanceDialogue() {
        if (this.yesBtn.visible) return;

        if (this.dialogueIndex < this.dialogueLines.length - 1) {
            this.dialogueIndex++;
            this.renderBeat(this.dialogueIndex);
        }
    }

    handleYes() {
        this.yesBtn.visible = false;
        this.noBtn.visible = false;

        // Hide all previous story elements
        this.dialogueBox.visible = false;
        this.dialogueText.visible = false;
        this.bgLayer.visible = false;
        this.charLayer.visible = false;
        if (this.bouquet) this.bouquet.visible = false;

        this.launchConfetti();

        let endingSprite: Sprite;
        if (this.assets['ending']) {
            endingSprite = Sprite.from(this.assets['ending']);
        } else {
            endingSprite = new Sprite(Texture.WHITE);
            endingSprite.tint = 0xFF1493;
            endingSprite.width = 1280; endingSprite.height = 720;
        }

        endingSprite.anchor.set(0.5);
        endingSprite.x = 1280 / 2;
        endingSprite.y = 720 / 2;

        // Scale to cover or contain? "Fits nicely in view". 
        // Likely Contain.
        const scale = Math.min(1280 / endingSprite.texture.width, 720 / endingSprite.texture.height);
        endingSprite.scale.set(scale * 0.8); // Start smaller

        this.overlayLayer.addChild(endingSprite);

        // Gentle zoom
        let s = scale * 0.8;
        const targetS = scale;
        const animate = () => {
            if (s < targetS) {
                s += 0.005;
                endingSprite.scale.set(s);
                requestAnimationFrame(animate);
            }
        };
        animate();

        setTimeout(() => this.showEndMenu(), 1500);
    }

    launchConfetti() {
        const colors = [0xFF69B4, 0xFFD700, 0x00BFFF, 0xFF4500];
        for (let i = 0; i < 100; i++) {
            const conf = new Graphics();
            conf.rect(0, 0, 10, 10);
            conf.fill(colors[Math.floor(Math.random() * colors.length)]);
            conf.x = Math.random() * 1280;
            conf.y = -50 - Math.random() * 500;
            const speed = 2 + Math.random() * 5;
            const spin = (Math.random() - 0.5) * 0.2;

            this.overlayLayer.addChild(conf);

            this.app.ticker.add((ticker) => {
                conf.y += speed;
                conf.rotation += spin;
                if (conf.y > 720) {
                    conf.y = -10;
                    conf.x = Math.random() * 1280;
                }
            });
        }
    }

    showEndMenu() {
        this.endMenu = new Container();

        const replayBg = new Graphics();
        replayBg.roundRect(0, 0, 250, 60, 30);
        replayBg.fill(0xFFFFFF);
        replayBg.stroke({ width: 2, color: 0x000000 });
        const replayText = new Text({ text: 'Replay 🔄', style: { fontSize: 24 } });
        replayText.anchor.set(0.5);
        replayText.x = 125; replayText.y = 30;

        const replayBtn = new Container();
        replayBtn.addChild(replayBg, replayText);
        replayBtn.x = 1280 / 2 - 260;
        replayBtn.y = 600;
        replayBtn.eventMode = 'static';
        replayBtn.cursor = 'pointer';
        replayBtn.on('pointerdown', () => this.replay());

        const homeBg = new Graphics();
        homeBg.roundRect(0, 0, 250, 60, 30);
        homeBg.fill(0xFF69B4);
        const homeText = new Text({ text: 'Portfolio 🏠', style: { fontSize: 24, fill: 'white' } });
        homeText.anchor.set(0.5);
        homeText.x = 125; homeText.y = 30;

        const homeBtn = new Container();
        homeBtn.addChild(homeBg, homeText);
        homeBtn.x = 1280 / 2 + 10;
        homeBtn.y = 600;
        homeBtn.eventMode = 'static';
        homeBtn.cursor = 'pointer';
        homeBtn.on('pointerdown', () => this.goHome());

        this.endMenu.addChild(replayBtn, homeBtn);
        this.overlayLayer.addChild(this.endMenu);
    }

    replay() {
        this.gameState.resetGame();
        this.router.navigate(['/valentine/start']);
    }

    goHome() {
        this.router.navigate(['/']);
    }

    @HostListener('window:resize')
    handleResize() {
        if (!this.app || !this.bgLayer) return;

        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        const screenW = this.app.screen.width;
        const screenH = this.app.screen.height;

        // 1. Resize BG to COVER
        const bg = this.bgLayer.children[0] as Sprite | Graphics;
        if (bg) {
            let bgW = 1280; let bgH = 720;
            if (bg instanceof Sprite && bg.texture) {
                bgW = bg.texture.width;
                bgH = bg.texture.height;
            } else {
                bgW = 100; bgH = 100;
            }

            const scale = Math.max(screenW / bgW, screenH / bgH);
            bg.scale.set(scale);
            bg.x = screenW / 2;
            bg.y = screenH / 2;
        }

        // 2. Resize GameContainer to CONTAIN
        if (this.gameContainer) {
            const targetW = 1280;
            const targetH = 720;

            const scale = Math.min(screenW / targetW, screenH / targetH);
            this.gameContainer.scale.set(scale);

            this.gameContainer.x = (screenW - (targetW * scale)) / 2;
            this.gameContainer.y = (screenH - (targetH * scale)) / 2;
        }
    }

    ngOnDestroy() {
        if (this.app) {
            this.app.destroy(true, { children: true, texture: true });
        }
    }
}
