import { Component, Input, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetLoaderService } from '../../services/asset-loader.service';

@Component({
  selector: 'app-level-completion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4 animate-fade-in text-center backdrop-blur-sm">
      
      <div class="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-yellow-400 relative animate-pop-in transform transition-all hover:scale-105">
        
        <!-- Confetti / Stars Background (CSS only) -->
        <div class="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        </div>

        <h2 class="text-2xl font-bold text-pink-600 mb-4 font-handwriting">
          Level Complete!
        </h2>

        <div class="relative w-24 h-24 mx-auto mb-4">
            <div class="absolute inset-0 bg-yellow-200 rounded-full blur-xl animate-pulse"></div>
            <img [src]="itemImage" [alt]="itemName" class="w-full h-full object-contain relative z-10 animate-bounce-slow drop-shadow-xl">
        </div>

        <p class="text-lg text-gray-700 font-bold mb-1">You earned:</p>
        <h3 class="text-xl text-purple-600 font-extrabold mb-2">{{ itemName }}</h3>
        
        <p class="text-gray-500 italic text-sm mb-6">"{{ itemDescription }}"</p>

        <button (click)="continue()" 
                class="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold py-2 px-8 rounded-full shadow-lg hover:shadow-xl transform transition hover:scale-110 active:scale-95 animate-pulse">
          Continue
        </button>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-fade-in { animation: fadeIn 0.5s ease-out; }
    .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .font-handwriting { font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; } /* Fallback */
  `]
})
export class LevelCompletionComponent implements OnInit {
  @Input() itemName: string = '';
  @Input() itemImage: string = ''; // URL to asset or use AssetLoader mapping
  @Input() itemDescription: string = 'A precious artifact.';
  @Output() onContinue = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    // Play sound?
  }

  continue() {
    this.onContinue.emit();
  }
}
