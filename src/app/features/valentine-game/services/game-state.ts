import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

export type MoodType = 'Soft' | 'Boss' | 'Mischief' | 'Overthink' | null;

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private router = inject(Router);

  // Core State
  readonly mood = signal<MoodType>('Soft'); // Default to Soft
  readonly lives = signal<number>(5);
  readonly companion = signal<'snehal' | 'apoorv'>('snehal'); // Default to Snehal
  readonly inventory = signal<Set<string>>(new Set());
  readonly currentLevel = signal<number>(0);

  // Level 1 Data
  readonly memoryWords = signal<string[]>([]);

  // Computed
  readonly hasShield = computed(() => this.inventory().has('Show-Up Shield'));
  readonly hasCompass = computed(() => this.inventory().has('Boundary Compass'));
  readonly hasBouquet = computed(() => this.inventory().has('Dual Bouquet'));

  // Actions
  setMood(mood: MoodType) {
    this.mood.set(mood);
  }

  setCompanion(companion: 'snehal' | 'apoorv') {
    this.companion.set(companion);
  }

  decreaseLife() {
    this.lives.update(n => n - 1);
    if (this.lives() <= 0) {
      setTimeout(() => {
        alert("Game Over! Try again."); // Simple alert for now, can be UI later
        this.resetGame();
        this.router.navigate(['/valentine']);
      }, 500);
    }
  }

  addToInventory(item: string) {
    this.inventory.update(inv => {
      const newInv = new Set(inv);
      newInv.add(item);
      return newInv;
    });
  }

  setMemoryWords(words: string[]) {
    this.memoryWords.set(words);
  }

  advanceLevel() {
    this.currentLevel.update(l => l + 1);
  }

  resetGame() {
    this.mood.set('Soft');
    this.lives.set(5);
    this.inventory.set(new Set());
    this.currentLevel.set(0);
    this.memoryWords.set([]);
  }
}
