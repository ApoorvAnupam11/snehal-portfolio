import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BIRTHDAY_DATA } from '../../birthday-data';

@Component({
  selector: 'app-birthday-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './birthday-landing.component.html',
  styleUrls: ['./birthday-landing.component.css']
})
export class BirthdayLandingComponent {
  data = BIRTHDAY_DATA.landing;
  confettiArray = Array.from({ length: 80 }).map(() => ({
    left: Math.random() * 100 + 'vw',
    delay: Math.random() * 10 + 's',
    duration: Math.random() * 3 + 4 + 's',
    color: ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#42a5f5', '#66bb6a', '#ffffff'][Math.floor(Math.random() * 7)],
    size: Math.random() * 0.8 + 0.5,
    rotation: Math.random() * 360 + 'deg'
  }));
}
