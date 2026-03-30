import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-birthday-popup',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './birthday-popup.component.html',
  styleUrls: ['./birthday-popup.component.css']
})
export class BirthdayPopupComponent { }
