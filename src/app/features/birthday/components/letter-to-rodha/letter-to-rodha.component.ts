import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BIRTHDAY_DATA } from '../../birthday-data';

@Component({
  selector: 'app-letter-to-rodha',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './letter-to-rodha.component.html',
  styleUrls: ['./letter-to-rodha.component.css']
})
export class LetterToRodhaComponent {
  data = BIRTHDAY_DATA.letter;
  evenImages = this.data.images.filter((_, i) => i % 2 === 0);
  oddImages = this.data.images.filter((_, i) => i % 2 !== 0);

  // Toggle state for touch-friendly mobile memory reveals
  activeMemoryIndex: number | null = null;

  toggleMemory(index: number) {
    if (this.activeMemoryIndex === index) {
      this.activeMemoryIndex = null;
    } else {
      this.activeMemoryIndex = index;
    }
  }
}
