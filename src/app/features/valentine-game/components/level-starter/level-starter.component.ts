import { Component, Input, Output, EventEmitter, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetLoaderService } from '../../services/asset-loader.service';
import { GameState } from '../../services/game-state';

@Component({
  selector: 'app-level-starter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 bg-black/90 flex flex-col md:flex-row items-center justify-center p-6 animate-fade-in text-center gap-8">
      
      <!-- Dialogue Box (Left on Desktop) -->
      <div class="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl border-4 border-pink-200 relative animate-slide-up md:text-left md:order-1 order-2">
        
        <p class="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed min-h-[4rem] flex items-center justify-center md:justify-start">
          "{{ currentDialogue() }}"
        </p>

        <!-- Navigation Controls -->
        <div class="flex justify-between items-center mt-8">
          
          <!-- Back Button -->
          <button (click)="prev()" [disabled]="currentIndex() === 0"
                  class="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <!-- Dots Indicator -->
          <div class="flex gap-2">
            <div *ngFor="let d of dialogues; let i = index" 
                 class="w-3 h-3 rounded-full transition-all duration-300"
                 [class.bg-pink-500]="i === currentIndex()"
                 [class.scale-125]="i === currentIndex()"
                 [class.bg-gray-300]="i !== currentIndex()">
            </div>
          </div>

          <!-- Next Button / Let's Go -->
          <button *ngIf="!isLastDialogue()" (click)="next()" 
                  class="p-2 rounded-full hover:bg-pink-50 transition-colors text-pink-600 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <button *ngIf="isLastDialogue()" (click)="finish()" 
                  class="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all animate-bounce">
            Let's Go! 🚀
          </button>

        </div>
      </div>

      <!-- Apoorv Character (Right on Desktop) -->
      <div class="relative w-48 h-48 md:w-80 md:h-80 mb-8 md:mb-0 md:order-2 order-1 flex-shrink-0">
        <div class="absolute inset-0 bg-pink-500/20 blur-3xl rounded-full animate-pulse-slow"></div>
        <img [src]="apoorvImage()" alt="Apoorv" class="w-full h-full object-contain filter drop-shadow-2xl animate-bounce-slow relative z-10">
      </div>
      
    </div>

    <div class="fixed bottom-8 w-full text-center pointer-events-none z-50">
        <p class="text-white/50 text-sm font-mono">Use Arrow Keys ← → to navigate</p>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-fade-in { animation: fadeIn 0.5s ease-out; }
    .animate-slide-up { animation: slideUp 0.5s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class LevelStarterComponent {
  @Input() dialogues: string[] = [];
  @Output() onComplete = new EventEmitter<void>();

  currentIndex = signal(0);

  // Apoorv Image (Dynamic based on selected mood)
  readonly apoorvImage = computed(() => {
    const mood = this.gameState.mood();
    let spriteMood = 'idle';

    switch (mood) {
      case 'Soft': spriteMood = 'idle'; break; // Apoorv is gentle
      case 'Boss': spriteMood = 'wink'; break; // Apoorv is impressed/scared
      case 'Mischief': spriteMood = 'proud'; break;
      case 'Overthink': spriteMood = 'surprised'; break; // Apoorv involves reassuring
      default: spriteMood = 'idle';
    }

    return this.assetLoader.getCharacterImage('apoorv', spriteMood);
  });

  currentDialogue = computed(() => this.dialogues[this.currentIndex()]);
  isLastDialogue = computed(() => this.currentIndex() === this.dialogues.length - 1);

  constructor(
    private assetLoader: AssetLoaderService,
    private gameState: GameState
  ) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      if (this.isLastDialogue()) {
        // Optional: Pressing right on last dialogue finishes? Or requires explicit button?
        // Let's stick to button click for "Let's Go" to be intentional.
      } else {
        this.next();
      }
    } else if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'Enter') {
      if (this.isLastDialogue()) {
        this.finish();
      } else {
        this.next();
      }
    }
  }

  next() {
    if (this.currentIndex() < this.dialogues.length - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }

  finish() {
    this.onComplete.emit();
  }
}
