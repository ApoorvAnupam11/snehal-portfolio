import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameState } from '../../services/game-state';
import { AssetLoaderService } from '../../services/asset-loader.service';

@Component({
    selector: 'app-bouquet-vault',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed inset-0 overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      
      <!-- Background -->
      <div class="absolute inset-0 z-0 bg-center bg-no-repeat" 
           style="background-image: url('assets/bg_bouquet.jpg'); background-size: 100% 100%;">
           <!-- Overlay for readability if needed -->
           <div class="absolute inset-0 bg-black/30"></div>
      </div>

      <!-- Main Content Container -->
      <div class="relative z-10 flex flex-col items-center justify-center w-full max-w-lg px-4 text-center">
        
        <!-- Prompt / Title -->
        <h2 *ngIf="!hasChosen()" class="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg animate-fade-in">
          Pick one flower to open the vault.
        </h2>

        <!-- Choice Buttons -->
        <div *ngIf="!hasChosen()" class="flex gap-6 md:gap-10">
            <!-- Sunflower Button -->
            <button (click)="chooseFlower('sunflower')" 
                    class="group relative flex flex-col items-center justify-center p-6 bg-yellow-100/90 hover:bg-yellow-50 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-4 border-yellow-400">
                <span class="text-6xl mb-2 filter drop-shadow-md">🌻</span>
                <span class="font-bold text-yellow-800 text-lg uppercase tracking-wider">Sunflowers</span>
                
                <!-- Glow effect on hover -->
                <div class="absolute inset-0 rounded-2xl bg-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            <!-- Rose Button -->
            <button (click)="chooseFlower('rose')" 
                    class="group relative flex flex-col items-center justify-center p-6 bg-red-100/90 hover:bg-red-50 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-4 border-red-400">
                <span class="text-6xl mb-2 filter drop-shadow-md">🌹</span>
                <span class="font-bold text-red-900 text-lg uppercase tracking-wider">Roses</span>

                <!-- Glow effect on hover -->
                <div class="absolute inset-0 rounded-2xl bg-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
        </div>

        <!-- Post-Choice Reveal -->
        <div *ngIf="hasChosen()" class="flex flex-col items-center justify-center animate-pop-in w-full h-full max-h-screen p-4">
            
            <!-- The Reward Icon -->
            <!-- Use viewport-based height to ensure it fits -->
            <div class="relative mb-2 shrink-0"> 
                <div class="absolute inset-0 bg-white/50 blur-xl rounded-full scale-150 animate-pulse"></div>
                <img src="/assets/icon_bouquet.png" 
                     class="h-[35vh] md:h-[45vh] w-auto max-w-[90vw] relative z-10 filter drop-shadow-2xl object-contain transition-all duration-500">
            </div>

            <h2 class="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg shrink-0">
                Plot twist: you get both.
            </h2>
            
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 md:p-6 mt-2 max-w-2xl shadow-2xl shrink-0">
                <p class="text-base md:text-xl text-white font-medium leading-relaxed italic">
                    "{{ companionLine }}"
                </p>
            </div>

            <!-- Transition Popup (Overlay) -->
            <div *ngIf="showTransition()" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
                <div class="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-pink-400 animate-pop-in">
                    <div class="mb-4">
                        <span class="text-6xl filter drop-shadow-md">🎉</span>
                    </div>
                    <h2 class="text-2xl font-bold text-pink-600 mb-2">Congratulations!</h2>
                    <p class="text-gray-700 text-lg font-medium mb-4">
                        You collected all artifacts.
                    </p>
                    <p class="text-pink-500 font-mono text-sm uppercase tracking-widest animate-pulse">
                        Moving to Observatory...
                    </p>
                </div>
            </div>
        </div>

      </div>

      <!-- Companion (Bottom Right) -->
      <div class="absolute bottom-0 right-4 md:right-10 z-20 w-40 md:w-60 pointer-events-none filter drop-shadow-2xl transition-transform duration-500"
           [class.translate-y-0]="hasChosen()"
           [class.translate-y-4]="!hasChosen()">
          <img [src]="companionImage()" class="w-full object-contain" alt="Companion">
      </div>

    </div>
  `,
    styles: [`
    .animate-fade-in { animation: fadeIn 0.8s ease-out; }
    .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes popIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class BouquetVaultComponent {

    hasChosen = signal(false);
    showTransition = signal(false); // New signal for popup
    companionLine = "I couldn’t decide… because you’re both, Warmth and Depth.";

    readonly companionImage = computed(() => {
        const companion = this.gameState.companion();
        let spriteMood = this.hasChosen() ? 'proud' : 'idle';

        // Map 'proud' to 'victorious' for Snehal if needed
        if (companion === 'snehal' && spriteMood === 'proud') {
            spriteMood = 'victorious';
        }

        return this.assetLoader.getCharacterImage(companion, spriteMood);
    });

    constructor(
        private router: Router,
        public gameState: GameState,
        public assetLoader: AssetLoaderService
    ) { }

    chooseFlower(flower: 'sunflower' | 'rose') {
        this.gameState.addToInventory('Dual Bouquet');
        this.hasChosen.set(true);

        // Wait 5 seconds before showing transition
        setTimeout(() => {
            this.showTransition.set(true);

            // Wait another 3 seconds for user to read, then navigate
            setTimeout(() => {
                this.continueToFinale();
            }, 3000);
        }, 5000);
    }

    continueToFinale() {
        this.router.navigate(['/valentine/final-cutscene']);
    }
}
