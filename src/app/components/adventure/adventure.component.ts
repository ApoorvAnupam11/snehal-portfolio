import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-adventure',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <!-- Background noise and overlay -->
      <div class="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
      
      <div class="z-10 text-center p-8 max-w-2xl">
        <h1 class="text-6xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 animate-pulse">
            Love Adventure
        </h1>
        <p class="text-xl font-mono text-gray-300 mb-8">
            Game Coming Soon...
        </p>
        
        <a routerLink="/" class="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-sm transition-all text-white font-mono uppercase tracking-widest cursor-pointer">
            Back to Reality
        </a>
      </div>
    </div>
  `,
    styles: []
})
export class AdventureComponent { }
