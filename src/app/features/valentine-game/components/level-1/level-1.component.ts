import { Component, OnInit, OnDestroy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameState } from '../../services/game-state';
import { AssetLoaderService } from '../../services/asset-loader.service';
import { LevelStarterComponent } from '../level-starter/level-starter.component';
import { LevelCompletionComponent } from '../level-completion/level-completion.component';

interface Bubble {
  id: number;
  word: string;
  x: number; // percentage left
  y: number; // percentage top
  speed: number;
  delay: number;
  selected: boolean;
}

@Component({
  selector: 'app-level-1',
  standalone: true,
  imports: [CommonModule, LevelStarterComponent, LevelCompletionComponent],
  templateUrl: './level-1.component.html',
  styleUrl: './level-1.component.css'
})
export class Level1Component implements OnInit, OnDestroy {
  readonly allWords = [
    'warmth', 'brave', 'sunshine', 'depth', 'genius',
    'magic', 'calm', 'sparkle', 'unstoppable', 'soft',
    'strength', 'smile', 'home', 'peace'
  ];

  collectedWords = signal<string[]>([]);
  showRetry = signal<boolean>(false);

  // Level Starter State
  showIntro = signal(true);
  readonly introDialogues = [
    "Explorer Snehal… welcome to your Valentine Quest. 🌙",
    "I packed snacks, sparkles, and a little bit of courage. 🧸✨",
    "Your mission: collect three artifacts… and reach the Observatory. 🔭✨",
    "Figure out how to earn each artifact. No spoilers. 😼✨",
    "Let’s make a tiny memory. 💛"
  ];

  bubbles = signal<Bubble[]>([]);
  timeLeft = signal<number>(12);
  timerInterval: any;
  spawnInterval: any;
  isGameOver = signal<boolean>(false);

  // Companion Image based on mood
  readonly companionImage = computed(() => {
    const mood = this.gameState.mood();
    const companion = this.gameState.companion();
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
    this.gameState.currentLevel.set(1);
    // Game starts after intro
  }

  startLevel() {
    this.showIntro.set(false);
    this.startGameLoop();
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopGameLoop();
  }

  stopGameLoop() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.spawnInterval) clearInterval(this.spawnInterval);
  }

  startGameLoop() {
    this.spawnInterval = setInterval(() => {
      this.addBubble();
    }, 800);
  }

  addBubble() {
    if (this.isGameOver() || this.showRetry()) return;
    if (this.bubbles().length > 8) return;

    const word = this.allWords[Math.floor(Math.random() * this.allWords.length)];

    // Don't spawn words already collected to keep game moving? 
    // Actually spec says "unique words", so duplicate spawns are fine, just selection logic needs check.

    const top = Math.random() * 60 + 15;
    const left = Math.random() * 85 + 5;

    const id = Date.now() + Math.random();
    const newBubble: Bubble = {
      id,
      word,
      x: left,
      y: top,
      speed: 0,
      delay: 0,
      selected: false
    };

    this.bubbles.update(prev => [...prev, newBubble]);

    setTimeout(() => {
      this.removeBubble(id);
    }, 4000);
  }

  removeBubble(id: number) {
    this.bubbles.update(prev => prev.filter(b => b.id !== id));
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(t => t - 1);
      } else {
        this.handleTimeout();
      }
    }, 1000);
  }

  selectBubble(id: number) {
    if (this.isGameOver() || this.showRetry()) return;

    const bubble = this.bubbles().find(b => b.id === id);
    if (!bubble || bubble.selected) return;

    // Check if word is already collected
    if (this.collectedWords().includes(bubble.word)) {
      // Maybe show a "Duplicate!" shake? For now just ignore or pop without adding.
      // Let's pop it anyway to clear screen.
      this.popBubble(id);
      return;
    }

    // Add to collection
    this.collectedWords.update(words => [...words, bubble.word]);
    this.popBubble(id);
    this.checkCompletion();
  }

  popBubble(id: number) {
    // 1. Mark as selected (trigger burst animation)
    this.bubbles.update(prev => prev.map(b => b.id === id ? { ...b, selected: true } : b));

    // 2. Remove after short burst duration
    setTimeout(() => {
      this.removeBubble(id);
    }, 300); // 300ms for burst
  }

  checkCompletion() {
    if (this.collectedWords().length >= 3) {
      this.finishLevel(this.collectedWords());
    }
  }

  handleTimeout() {
    this.stopGameLoop();
    if (this.collectedWords().length < 3) {
      this.gameState.decreaseLife(); // Deduct life on timeout failure
      this.showRetry.set(true);
    } else {
      this.finishLevel(this.collectedWords());
    }
  }

  retryLevel() {
    this.showRetry.set(false);
    this.collectedWords.set([]);
    this.bubbles.set([]);
    this.timeLeft.set(12);
    this.startGameLoop();
    this.startTimer();
  }

  // Completion State
  showCompletion = signal(false);

  finishLevel(words: string[]) {
    this.isGameOver.set(true);
    this.stopGameLoop();

    // Reward: Love Token
    this.gameState.addToInventory('Love Token');
    this.gameState.setMemoryWords(words);

    setTimeout(() => {
      this.showCompletion.set(true);
    }, 1000); // Small delay for effect
  }

  continueToNextLevel() {
    this.router.navigate(['/valentine/level-2']);
  }
}
