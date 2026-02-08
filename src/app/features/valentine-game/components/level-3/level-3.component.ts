import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameState } from '../../services/game-state';
import { AssetLoaderService } from '../../services/asset-loader.service';
import { LevelCompletionComponent } from '../level-completion/level-completion.component';

interface Card {
    id: number;
    text: string;
    category: 'Friendly' | 'Flirty' | 'Red Flag';
}

@Component({
    selector: 'app-level-3',
    standalone: true,
    imports: [CommonModule, LevelCompletionComponent],
    template: `
    <div class="fixed inset-0 overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      
      <!-- Background -->
      <div class="absolute inset-0 z-0 bg-cover bg-center" 
           style="background-image: url('/assets/bg_detector.png');">
      </div>

      <!-- Header (Removed as per request) -->

      <!-- Card Stack Area (Rectangular Area in BG) -->
      <!-- Adjusted to be slightly above center to match typical background layouts -->
      <div class="relative z-20 w-80 h-56 perspective-1000 mb-20 flex justify-center items-center">
          
          <!-- Draggable Card -->
          <div *ngIf="currentCard() && !isProcessing" 
               class="absolute w-64 h-40 bg-white rounded-xl shadow-2xl p-4 flex items-center justify-center text-center border-2 border-gray-100 cursor-grab active:cursor-grabbing touch-none select-none transition-transform"
               [style.transform]="getCardTransform()"
               [class.transition-all]="!isDragging"
               [class.duration-300]="!isDragging"
               (mousedown)="startDrag($event)"
               (touchstart)="startDrag($event)"
               (window:mousemove)="drag($event)"
               (window:touchmove)="drag($event)"
               (window:mouseup)="endDrag()"
               (window:touchend)="endDrag()">
              
              <div class="pointer-events-none">
                <p class="text-lg font-bold text-gray-800 leading-snug">
                    "{{ currentCard()?.text }}"
                </p>
              </div>
          </div>
      </div>

      <!-- Progress Indicator (Top Right) -->
      <div class="absolute top-24 right-4 z-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-mono text-xl font-bold shadow-lg pointer-events-none">
          {{ currentIndex + 1 }} / {{ totalCards }}
      </div>

      <!-- Companion (Bottom Right - Matching Level 2) -->
      <div class="absolute bottom-0 right-4 md:right-10 z-10 w-40 md:w-60 pointer-events-none filter drop-shadow-2xl">
          <img [src]="companionImage()" class="w-full object-contain" alt="Companion">
      </div>

      <!-- Feedback Overlay (Center Screen) -->
      <div *ngIf="feedback()" 
           class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl text-2xl font-bold animate-bounce transition-all duration-300 pointer-events-none"
           [ngClass]="getFeedbackClass()">
          {{ feedback() }}
      </div>

      <!-- Drop Zones (Hit Targets matching background/layout) -->
      <!-- Full Width Bins: Visually behind cards, at bottom but raised above HUD -->
      <div class="absolute bottom-20 left-0 right-0 z-10 flex h-24 md:h-32 items-end pointer-events-none w-full px-2 gap-1">
        
        <!-- Friendly (Left) -->
        <div class="flex-1 h-full flex flex-col items-center justify-end pb-4 border-t-4 border-green-400 transition-colors duration-300 bg-green-900/40 backdrop-blur-sm rounded-t-xl"
             [class.bg-green-600/60]="hoverZone === 'Friendly'"
             [class.bg-opacity-60]="hoverZone === 'Friendly'">
             <span class="text-2xl mb-1 filter drop-shadow-md">🌿</span>
             <span class="text-white font-bold tracking-widest uppercase drop-shadow-md text-sm md:text-base">Friendly</span>
        </div>

        <!-- Flirty (Center) -->
        <div class="flex-1 h-full flex flex-col items-center justify-end pb-4 border-t-4 border-pink-400 transition-colors duration-300 bg-pink-900/40 backdrop-blur-sm rounded-t-xl"
             [class.bg-pink-600/60]="hoverZone === 'Flirty'"
             [class.bg-opacity-60]="hoverZone === 'Flirty'">
             <span class="text-2xl mb-1 filter drop-shadow-md">💋</span>
             <span class="text-white font-bold tracking-widest uppercase drop-shadow-md text-sm md:text-base">Flirty</span>
        </div>

        <!-- Red Flag (Right) -->
        <div class="flex-1 h-full flex flex-col items-center justify-end pb-4 border-t-4 border-red-400 transition-colors duration-300 bg-red-900/40 backdrop-blur-sm rounded-t-xl"
             [class.bg-red-600/60]="hoverZone === 'Red Flag'"
             [class.bg-opacity-60]="hoverZone === 'Red Flag'">
             <span class="text-2xl mb-1 filter drop-shadow-md">🚩</span>
             <span class="text-white font-bold tracking-widest uppercase drop-shadow-md text-sm md:text-base">Red Flag</span>
        </div>

      </div>

    <!-- Level Completion Popup -->
    <app-level-completion *ngIf="showCompletion()"
        itemName="Boundary Compass"
        itemImage="assets/icon_compass.png"
        itemDescription="You navigated the signals perfectly. Your compass is true!"
        (onContinue)="continueToNextLevel()">
    </app-level-completion>
    </div>
  `,
    styles: [`
    :host { display: block; touch-action: none; } /* Prevent scroll on mobile while dragging */
    .perspective-1000 { perspective: 1000px; }
    .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes popIn {
        from { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
  `]
})
export class Level3Component implements OnInit {
    cards: Card[] = [
        { id: 1, text: "You're actually really smart.", category: 'Red Flag' }, // Negging
        { id: 2, text: "I love how passionate you are.", category: 'Friendly' },
        { id: 3, text: "Your eyes distract me from working.", category: 'Flirty' },
        { id: 4, text: "Why are you wearing that?", category: 'Red Flag' },
        { id: 5, text: "Thanks for always being there.", category: 'Friendly' },
        { id: 6, text: "Is it hot in here or is it just you?", category: 'Flirty' },
        { id: 7, text: "You're too sensitive.", category: 'Red Flag' },
        { id: 8, text: "We make a great team.", category: 'Friendly' }
    ];

    totalCards = this.cards.length;
    currentIndex = 0;

    currentCard = signal<Card | null>(null);
    feedback = signal<string>('');
    sortedCount = signal(0);
    isLevelComplete = signal(false);

    // Drag State
    isDragging = false;
    isProcessing = false;
    startX = 0;
    startY = 0;
    currentX = 0;
    currentY = 0;
    hoverZone: 'Friendly' | 'Flirty' | 'Red Flag' | null = null;

    // Companion Image (Snehal or Apoorv)
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
        this.gameState.currentLevel.set(3);
        this.loadNextCard();
    }

    loadNextCard() {
        if (this.currentIndex < this.cards.length) {
            this.isProcessing = true;
            this.currentCard.set(null);

            // Reset Drag State
            this.currentX = 0;
            this.currentY = 0;
            this.hoverZone = null;

            setTimeout(() => {
                this.isProcessing = false;
                this.currentCard.set(this.cards[this.currentIndex]);
            }, 300);
        } else {
            this.currentCard.set(null);
            this.handleWin();
        }
    }

    // --- Drag & Drop Logic ---

    startDrag(event: MouseEvent | TouchEvent) {
        if (this.isProcessing || this.isLevelComplete()) return;

        this.isDragging = true;

        if (event instanceof MouseEvent) {
            this.startX = event.clientX - this.currentX;
            this.startY = event.clientY - this.currentY;
        } else {
            this.startX = event.touches[0].clientX - this.currentX;
            this.startY = event.touches[0].clientY - this.currentY;
        }
    }

    drag(event: MouseEvent | TouchEvent) {
        if (!this.isDragging) return;

        event.preventDefault(); // Stop scrolling

        let clientX, clientY;
        if (event instanceof MouseEvent) {
            clientX = event.clientX;
            clientY = event.clientY;
        } else {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }

        this.currentX = clientX - this.startX;
        this.currentY = clientY - this.startY;

        this.checkDropZone(clientX, clientY);
    }

    endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;

        if (this.hoverZone) {
            this.attemptSort(this.hoverZone);
        } else {
            // Spring back
            this.currentX = 0;
            this.currentY = 0;
            this.hoverZone = null;
        }
    }

    getCardTransform() {
        const rotation = this.currentX * 0.1; // Rotate while dragging
        return `translate(${this.currentX}px, ${this.currentY}px) rotate(${rotation}deg)`;
    }

    checkDropZone(x: number, y: number) {
        const height = window.innerHeight;
        const width = window.innerWidth;

        // Simple zone logic based on screen position
        // Zones are at the bottom 30% of screen
        if (y < height * 0.6) {
            this.hoverZone = null;
            return;
        }

        // Horizontal zones
        if (x < width / 3) {
            this.hoverZone = 'Friendly';
        } else if (x < (width / 3) * 2) {
            this.hoverZone = 'Flirty';
        } else {
            this.hoverZone = 'Red Flag';
        }
    }

    attemptSort(category: 'Friendly' | 'Flirty' | 'Red Flag') {
        const card = this.currentCard();
        if (!card) return;

        if (card.category === category) {
            // Correct
            this.isProcessing = true;
            this.feedback.set(`Correct! ${category}`);
            this.currentIndex++;
            this.sortedCount.update(c => c + 1);

            // Animate off screen towards the bin
            // Use current velocity or just simplistic push
            const offScreenY = 500;
            const offScreenX = this.currentX; // Keep X trajectory

            // We'll let the angular binding handle a simple translate if we update currentX/Y?
            // Since isDragging is false, the transition class is active.
            this.currentY = offScreenY;

            setTimeout(() => {
                this.feedback.set('');
                this.loadNextCard();
            }, 600);
        } else {
            // Wrong
            this.gameState.decreaseLife(); // Deduct life on wrong sort
            this.feedback.set(`Wrong! Not ${category}`);
            this.hoverZone = null;
            setTimeout(() => {
                this.feedback.set('');
                // Spring back
                this.currentX = 0;
                this.currentY = 0;
            }, 800);
        }
    }


    // The original sort method is no longer used for user interaction, but kept for reference if needed.
    // It's effectively replaced by attemptSort triggered by drag-and-drop.
    sort(category: 'Friendly' | 'Flirty' | 'Red Flag') {
        const card = this.currentCard();
        if (!card || this.isLevelComplete()) return;

        if (card.category === category) {
            // Correct
            this.feedback.set(`Correct! ${category}`);
            this.currentIndex++;
            this.sortedCount.update(c => c + 1);
            setTimeout(() => {
                this.feedback.set('');
                this.loadNextCard();
            }, 800);
        } else {
            // Wrong
            this.feedback.set(`Wrong! Not ${category}`);
            setTimeout(() => this.feedback.set(''), 1000);
        }
    }

    getFeedbackClass() {
        if (this.feedback().startsWith('Correct')) return 'bg-green-500 text-white';
        return 'bg-red-500 text-white';
    }

    showCompletion = signal(false);

    handleWin() {
        this.isLevelComplete.set(true);
        // Reward: Boundary Compass
        this.gameState.addToInventory('Boundary Compass');

        setTimeout(() => {
            // Navigate to Level 4 / Plot Twist / Finale
            this.showCompletion.set(true);
        }, 1500);
    }

    continueToNextLevel() {
        this.router.navigate(['/valentine/level-4']); // Level 4 or Finale
    }
}
