import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Important for *ngIf if not already present
import { HudComponent } from '../hud/hud.component';
import { GameState } from '../../services/game-state';

@Component({
  selector: 'app-game-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HudComponent],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.css'
})
export class GameContainer {
  constructor(public gameState: GameState) { }
}
