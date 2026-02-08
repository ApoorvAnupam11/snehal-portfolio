import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
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
export class ShinChanPopupComponent implements OnInit, OnDestroy {
    isVisible = false;
    private routerSubscription: Subscription | undefined;

    constructor(private router: Router) { }

    ngOnInit() {
        this.checkVisibility();

        // Subscribe to router events to handle navigation
        this.routerSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.checkVisibility();
        });
    }

    ngOnDestroy() {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }

    private checkVisibility() {
        // Only show strictly on the home page ('/')
        const isHomePage = this.router.url === '/';

        if (!isHomePage) {
            this.isVisible = false;
            return;
        }

        // Check if it's Valentine's Day logic (simplified for demo)
        const isValentines = true;

        if (isValentines && isHomePage && !this.isVisible) {
            // Only set timeout if we are not already visible to avoid reset loops
            // Actually, simplest is just to set it true if home
            setTimeout(() => {
                if (this.router.url === '/') {
                    this.isVisible = true;
                }
            }, 1000);
        }
    }

    startAdventure() {
        this.isVisible = false;
        this.router.navigate(['/valentine']);
    }
}
