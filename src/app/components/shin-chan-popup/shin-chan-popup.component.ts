import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-shin-chan-popup',
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('slideIn', [
            state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
            state('*', style({ transform: 'translateY(0)', opacity: 1 })),
            transition('void => *', animate('600ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
        ])
    ],
    template: `
    <div *ngIf="isVisible" [@slideIn] class="fixed bottom-4 right-4 z-[100] flex flex-col items-end pointer-events-none">
      <!-- Speech Bubble -->
      <div class="bg-white text-black p-4 rounded-2xl rounded-br-none shadow-lg mb-4 max-w-xs relative pointer-events-auto border-2 border-black">
        <p class="font-mono text-sm font-bold mb-2">
           Hey! If today is Valentine's Day, let's go on a journey together!
        </p>
        <p class="font-mono text-xs text-gray-600 mb-3">
            We can see the boring portfolio later.
        </p>
        <button (click)="startAdventure()" 
          class="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors w-full uppercase tracking-wider cursor-pointer">
          Click for Adventure!
        </button>
        <!-- Triangle for speech bubble -->
        <div class="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b-2 border-r-2 border-black transform rotate-45"></div>
      </div>

      <!-- Character -->
      <img src="assets/shin_chan_valentine_1770505808592.png" alt="Shin Chan" class="w-32 h-32 object-contain pointer-events-auto hover:scale-110 transition-transform cursor-pointer" (click)="startAdventure()">
    </div>
  `,
    styles: []
})
export class ShinChanPopupComponent implements OnInit {
    isVisible = false;

    constructor(private router: Router) { }

    ngOnInit() {
        // Check if it's Valentine's Day (Feb 14)
        // Month is 0-indexed (0 = Jan, 1 = Feb)
        const today = new Date();
        // For demo purposes, we can uncomment the next line to always show it
        const isValentines = true; // today.getMonth() === 1 && today.getDate() === 14;

        if (isValentines) {
            setTimeout(() => {
                this.isVisible = true;
            }, 1000); // Slight delay for effect
        }
    }

    startAdventure() {
        this.isVisible = false;
        this.router.navigate(['/adventure']);
    }
}
