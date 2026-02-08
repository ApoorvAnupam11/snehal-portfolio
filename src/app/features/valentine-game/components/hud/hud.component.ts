import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameState } from '../../services/game-state';

@Component({
  selector: 'app-hud',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="gameState.currentLevel() >= 1" class="pointer-events-none">
      
      <!-- Top Center Container (Mini-map & Inventory Items) -->
      <div class="fixed top-2 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center gap-2 w-full max-w-sm px-4">
        
        <!-- Mini-map -->
        <div *ngIf="gameState.currentLevel() > 0" 
             class="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-pink-200 flex items-center gap-2 animate-fade-in pointer-events-auto">
           <span class="text-[9px] font-bold text-pink-400 uppercase tracking-widest mr-0.5">Journey</span>
           <div class="flex items-center gap-0.5">
              <ng-container *ngFor="let step of [1, 2, 3, 4]; let i = index; let last = last">
                  <div class="relative flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-500"
                       [class.bg-pink-500]="gameState.currentLevel() >= step"
                       [class.border-pink-500]="gameState.currentLevel() >= step"
                       [class.bg-white]="gameState.currentLevel() < step"
                       [class.border-pink-200]="gameState.currentLevel() < step"
                       [class.scale-105]="gameState.currentLevel() === step">
                       <span *ngIf="gameState.currentLevel() > step" class="text-white text-[10px]">✓</span>
                       <span *ngIf="gameState.currentLevel() <= step" 
                             [class.text-pink-500]="gameState.currentLevel() === step"
                             [class.text-pink-200]="gameState.currentLevel() < step"
                             class="text-[9px] font-bold">{{ step === 4 ? '❤️' : step }}</span>
                  </div>
                  <div *ngIf="!last" class="w-3 h-0.5 transition-colors duration-500"
                       [class.bg-pink-400]="gameState.currentLevel() > step"
                       [class.bg-pink-100]="gameState.currentLevel() <= step">
                  </div>
              </ng-container>
           </div>
        </div>
      </div>

      <!-- Bottom Center Container (Main Stats: Level, Tokens, Toggle) -->
      <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2 w-full max-w-sm px-4">
        <div class="bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-xl border-2 border-pink-200 flex items-center justify-between gap-4 w-full pointer-events-auto relative">
          
          <!-- Stats Group (Centered) -->
          <div class="flex items-center justify-between w-full">
              <!-- Lives -->
              <div class="flex items-center gap-1.5" title="Lives Left">
              <span class="text-lg animate-pulse filter drop-shadow-sm">💖</span>
              <span class="text-lg font-black text-pink-600 font-mono">{{ gameState.lives() }}</span>
              </div>

              <!-- Inventory Toggle -->
              <button (click)="toggleInventory()" 
                      class="w-8 h-8 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center text-lg hover:bg-pink-200 transition-colors shadow-sm relative active:scale-95">
                  🎒
                  <span *ngIf="inventoryItems().length > 0" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
              </button>
          </div>
        </div>
      </div>

      <!-- Inventory Drawer Overlay -->
      <div *ngIf="showInventory" 
           class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center pointer-events-auto"
           (click)="toggleInventory()">
           
           <div class="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transform transition-transform animate-slide-up"
                (click)="$event.stopPropagation()">
                
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-pink-600">Your Collection</h3>
                    <button (click)="toggleInventory()" class="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <!-- Empty State -->
                <div *ngIf="inventoryItems().length === 0" class="text-center py-8 text-gray-400 italic">
                    <p>Your backpack is empty...</p>
                    <p class="text-sm mt-2">Explore to find treasures!</p>
                </div>

                <!-- Items Grid -->
                <div class="space-y-4">
                    <div *ngFor="let item of inventoryItems()" 
                         class="flex items-center gap-4 p-3 rounded-xl bg-pink-50 border border-pink-100">
                        <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm overflow-hidden">
                            <img *ngIf="isImageItem(item)" [src]="getItemEmoji(item)" class="w-full h-full object-cover">
                            <span *ngIf="!isImageItem(item)">{{ getItemEmoji(item) }}</span>
                        </div>
                        <div>
                            <p class="font-bold text-gray-800">{{ item }}</p>
                            <p class="text-xs text-pink-500">{{ getItemDescription(item) }}</p>
                        </div>
                    </div>
                </div>
           </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-up {
        animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
  `]
})
export class HudComponent {
  inventoryItems = computed(() => Array.from(this.gameState.inventory()));
  showInventory = false;

  constructor(public gameState: GameState) { }

  toggleInventory() {
    this.showInventory = !this.showInventory;
  }

  getItemEmoji(item: string): string {
    switch (item) {
      case 'Show-Up Shield': return 'assets/icon_shield.png';
      case 'Boundary Compass': return 'assets/icon_compass.png';
      case 'Dual Bouquet': return 'assets/icon_bouquet.png';
      case 'Love Token': return 'assets/icon_token.png';
      default: return 'assets/icon_token.png';
    }
  }

  isImageItem(item: string): boolean {
    return true; // All items are now images
  }

  getItemDescription(item: string): string {
    switch (item) {
      case 'Show-Up Shield': return 'Protects you from self-doubt.';
      case 'Boundary Compass': return 'Guides you to healthy relationships.';
      case 'Dual Bouquet': return 'A symbol of shared love.';
      default: return 'A mysterious item.';
    }
  }
}
