import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HudComponent } from '../hud/hud.component';

@Component({
  selector: 'app-game-container',
  standalone: true,
  imports: [RouterOutlet, HudComponent],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.css'
})
export class GameContainer { }
