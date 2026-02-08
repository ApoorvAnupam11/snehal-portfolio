import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameState, MoodType } from '../../services/game-state';
import { AssetLoaderService } from '../../services/asset-loader.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.css'
})
export class StartScreen {
  readonly moodOptions: { type: MoodType; emoji: string; label: string }[] = [
    { type: 'Soft', emoji: '🥺', label: 'Soft' },
    { type: 'Boss', emoji: '😈', label: 'Boss' },
    { type: 'Mischief', emoji: '😼', label: 'Mischief' },
    { type: 'Overthink', emoji: '🌫️', label: 'Overthink' },
  ];

  constructor(
    private router: Router,
    public gameState: GameState,
    public assetLoader: AssetLoaderService
  ) { }

  selectMood(mood: MoodType) {
    this.gameState.setMood(mood);
    console.log('Mood selected:', mood);
  }

  startGame() {
    if (this.gameState.mood()) {
      this.router.navigate(['/valentine/level-1']);
    }
  }

  // Reactive sprite getters based on current mood
  readonly snehalImage = computed(() => {
    const mood = this.gameState.mood();
    let spriteMood = 'idle';

    switch (mood) {
      case 'Soft': spriteMood = 'idle'; break;
      case 'Boss': spriteMood = 'victorious'; break;
      case 'Mischief': spriteMood = 'happy'; break;
      case 'Overthink': spriteMood = 'thinking'; break;
      default: spriteMood = 'idle';
    }

    return this.assetLoader.getCharacterImage('snehal', spriteMood);
  });

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
}
