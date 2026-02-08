import { Component, ElementRef, ViewChild, AfterViewInit, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameState } from '../../services/game-state';
import { AssetLoaderService } from '../../services/asset-loader.service';
import { LevelCompletionComponent } from '../level-completion/level-completion.component';

@Component({
    selector: 'app-level-2',
    standalone: true,
    imports: [CommonModule, LevelCompletionComponent],
    template: `
    <div class="relative w-full h-screen overflow-hidden bg-slate-900">
      
      <!-- Background Image -->
      <div class="absolute inset-0 z-0 bg-cover bg-center" 
           style="background-image: url('/assets/bg_fog_bridge.png');">
      </div>

      <!-- Content (Under Fog) -->
      <div class="absolute inset-0 z-0 content-container flex flex-col items-center justify-center">
           
           <!-- Puzzle (Centered) -->
           <div class="bg-white/95 p-8 rounded-3xl shadow-2xl max-w-2xl w-full border-4 border-pink-200 mx-4 transform transition-all duration-500 relative z-20"
                [class.scale-95]="!fogCleared()"
                [class.blur-sm]="!fogCleared()">
                
                <h2 class="text-3xl font-bold text-pink-600 mb-6 text-center">Clear the Mind Fog</h2>

                <p class="text-2xl text-gray-700 mb-8 font-medium leading-relaxed text-center">
                    "When I feel unsure, I will <span class="border-b-4 border-pink-400 font-bold text-pink-600 px-2 inline-block min-w-[100px] text-center">{{ selectedOption() || '&nbsp;' }}</span> for myself."
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button *ngFor="let option of options" 
                            (click)="selectOption(option)"
                            [disabled]="isLevelComplete()"
                            [class.bg-pink-500]="selectedOption() === option"
                            [class.text-white]="selectedOption() === option"
                            [class.bg-white]="selectedOption() !== option"
                            class="py-4 px-6 rounded-2xl border-2 border-pink-300 font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-md text-pink-700">
                        {{ option }}
                    </button>
                </div>

                <!-- Error Feedback -->
                <div *ngIf="feedbackMessage() && !isLevelComplete()" class="mt-6 text-center text-xl font-bold animate-bounce text-red-500">
                    {{ feedbackMessage() }}
                </div>
           </div>

            <!-- Companion character (Bottom Right) -->
           <div class="absolute bottom-0 right-4 md:right-10 z-10 w-40 md:w-60 pointer-events-none filter drop-shadow-2xl">
                <img [src]="companionImage()" class="w-full object-contain" [alt]="gameState.companion()">
           </div>
      </div>

      <!-- Fog Canvas Overlay -->
      <canvas #fogCanvas 
              [class.pointer-events-none]="fogCleared()"
              class="absolute inset-0 z-30 touch-none cursor-crosshair transition-opacity duration-1000"
              [class.opacity-0]="fogCleared()">
      </canvas>

      <!-- Tutorial/Hint -->
      <div *ngIf="!fogCleared()" class="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none text-white text-opacity-90 font-bold text-2xl animate-pulse drop-shadow-md text-center">
          <p>The bridge is foggy...</p>
          <p class="text-lg mt-2 font-normal">Swipe to clear the path! ☁️</p>
      </div>

      <!-- Level Completion Popup (Fixed at root) -->
      <app-level-completion *ngIf="showCompletion()"
        itemName="Boundary Compass"
        itemImage="assets/icon_compass.png"
        itemDescription="Directs you to what matters. You set a boundary!"
        (onContinue)="continueToNextLevel()">
      </app-level-completion>

    </div>
  `,
    styles: [`
    :host {
        display: block;
        height: 100vh;
    }
    .content-container {
        pointer-events: none; /* Initially disable interaction with content */
    }
    .content-container.interactive {
        pointer-events: auto;
    }
  `]
})
export class Level2Component implements AfterViewInit {
    @ViewChild('fogCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    fogCleared = signal(false);
    selectedOption = signal<string | null>(null);
    feedbackMessage = signal<string>('');
    isLevelComplete = signal(false);
    showCompletion = signal(false);

    readonly options = ['Hide', 'Show Up', 'Run'];

    private ctx!: CanvasRenderingContext2D;
    private isDrawing = false;

    readonly companionImage = computed(() => {
        const companion = this.gameState.companion();
        const mood = this.gameState.mood();
        let spriteMood = 'idle';

        switch (mood) {
            case 'Soft': spriteMood = 'idle'; break;
            case 'Boss': spriteMood = 'victorious'; break;
            case 'Mischief': spriteMood = 'happy'; break;
            case 'Overthink': spriteMood = 'thinking'; break;
            default: spriteMood = 'idle';
        }

        return this.assetLoader.getCharacterImage(companion, spriteMood);
    });

    constructor(
        private router: Router,
        public gameState: GameState,
        public assetLoader: AssetLoaderService
    ) { }

    ngOnInit() {
        this.gameState.currentLevel.set(2);
    }

    ngAfterViewInit() {
        this.initCanvas();
    }

    initCanvas() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d', { willReadFrequently: true })!;

        this.resizeCanvas();
        this.drawFog();

        // Event Listeners for Drawing
        canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        canvas.addEventListener('mousemove', this.draw.bind(this));
        canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        canvas.addEventListener('touchstart', this.startDrawing.bind(this), { passive: false });
        canvas.addEventListener('touchmove', this.draw.bind(this), { passive: false });
        canvas.addEventListener('touchend', this.stopDrawing.bind(this));
    }

    @HostListener('window:resize')
    resizeCanvas() {
        if (!this.canvasRef) return;
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (!this.fogCleared()) {
            this.drawFog();
        }
    }

    drawFog() {
        this.ctx.fillStyle = '#9ca3af'; // Gray-400
        this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

        // Instructions on Canvas
        this.ctx.font = '30px sans-serif';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Can't see clearly...", this.canvasRef.nativeElement.width / 2, this.canvasRef.nativeElement.height / 2);
    }

    startDrawing(e: MouseEvent | TouchEvent) {
        e.preventDefault();
        this.isDrawing = true;
        this.draw(e);
    }

    stopDrawing() {
        this.isDrawing = false;
        this.checkFogClearance();
    }

    draw(e: MouseEvent | TouchEvent) {
        if (!this.isDrawing || this.fogCleared()) return;

        e.preventDefault(); // Prevent scrolling on touch

        const canvas = this.canvasRef.nativeElement;
        const rect = canvas.getBoundingClientRect();

        let x, y;
        if (e instanceof MouseEvent) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        } else {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        }

        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 40, 0, Math.PI * 2);
        this.ctx.fill();
    }

    checkFogClearance() {
        if (this.fogCleared()) return;

        // Sample pixels to check transparency
        // Checking every pixel is expensive, let's step
        const canvas = this.canvasRef.nativeElement;
        const w = canvas.width;
        const h = canvas.height;
        // Only check center area where content is primarily? Or just general %
        const imageData = this.ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        let transparentPixels = 0;
        const step = 50; // Check every 50th pixel for performance

        for (let i = 0; i < data.length; i += 4 * step) {
            if (data[i + 3] === 0) {
                transparentPixels++;
            }
        }

        const totalPixelsChecked = data.length / (4 * step);
        const clearPercent = transparentPixels / totalPixelsChecked;

        if (clearPercent > 0.4) { // 40% cleared is enough
            this.fogCleared.set(true);

            // Enable interaction with content
            const container = document.querySelector('.content-container');
            if (container) container.classList.add('interactive');
        }
    }

    selectOption(option: string) {
        if (this.isLevelComplete()) return;

        this.selectedOption.set(option);

        if (option === 'Show Up') {
            this.handleWin();
        } else {
            this.gameState.decreaseLife(); // Deduct life on wrong choice
            this.feedbackMessage.set('Try again... that creates distance.');
            setTimeout(() => this.feedbackMessage.set(''), 2000);
        }
    }

    handleWin() {
        this.isLevelComplete.set(true);
        this.feedbackMessage.set(''); // Clear any error message

        // Reward: Boundary Compass
        this.gameState.addToInventory('Boundary Compass');

        setTimeout(() => {
            this.showCompletion.set(true);
        }, 1500);
    }

    continueToNextLevel() {
        this.router.navigate(['/valentine/level-3']);
    }
}
