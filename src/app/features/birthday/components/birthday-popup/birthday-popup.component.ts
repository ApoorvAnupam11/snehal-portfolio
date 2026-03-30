import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-birthday-popup',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './birthday-popup.component.html',
  styleUrls: ['./birthday-popup.component.css']
})
export class BirthdayPopupComponent implements OnInit, OnDestroy {
  isReady = false;
  countdownText = '';
  private timer: any;
  private targetDate = new Date('2026-03-31T00:00:00+05:30'); // Midnight Mar 31st

  ngOnInit() {
    this.updateCountdown();
    this.timer = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateCountdown() {
    const now = new Date();
    const diffMs = this.targetDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      this.isReady = true;
      this.countdownText = 'A surprise for you';
      if (this.timer) {
        clearInterval(this.timer);
      }
    } else {
      this.isReady = false;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      const hh = hours.toString().padStart(2, '0');
      const mm = minutes.toString().padStart(2, '0');
      const ss = seconds.toString().padStart(2, '0');
      this.countdownText = `${hh}:${mm}:${ss}`;
    }
  }
}
