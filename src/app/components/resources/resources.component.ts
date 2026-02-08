import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-black pt-24 pb-16 px-4">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-4xl md:text-6xl font-serif font-bold mb-12 text-white text-center tracking-tighter">
          Resource Library
        </h2>
        
        <div class="glass-card rounded-sm border border-white/10 overflow-hidden">
          <ul class="divide-y divide-white/10">
            
            <!-- Resource Item 1 -->
            <li class="p-6 hover:bg-white/5 flex items-center justify-between group cursor-pointer transition-colors">
              <div class="flex items-center gap-6">
                <div class="p-4 bg-white/5 border border-white/10 rounded-sm text-white group-hover:bg-white group-hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">Case Interview Prep Guide</h3>
                  <p class="text-sm text-gray-500 font-mono uppercase tracking-wider">PDF • 2.4 MB</p>
                </div>
              </div>
              <button class="px-6 py-2 text-xs font-bold uppercase tracking-widest text-white border border-white/20 rounded-sm hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
                Download
              </button>
            </li>

            <!-- Resource Item 2 -->
             <li class="p-6 hover:bg-white/5 flex items-center justify-between group cursor-pointer transition-colors">
              <div class="flex items-center gap-6">
                <div class="p-4 bg-white/5 border border-white/10 rounded-sm text-white group-hover:bg-white group-hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">Market Sizing Cheat Sheet</h3>
                  <p class="text-sm text-gray-500 font-mono uppercase tracking-wider">XLSX • 1.1 MB</p>
                </div>
              </div>
              <button class="px-6 py-2 text-xs font-bold uppercase tracking-widest text-white border border-white/20 rounded-sm hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
                Download
              </button>
            </li>

             <!-- Resource Item 3 -->
             <li class="p-6 hover:bg-white/5 flex items-center justify-between group cursor-pointer transition-colors">
              <div class="flex items-center gap-6">
                <div class="p-4 bg-white/5 border border-white/10 rounded-sm text-white group-hover:bg-white group-hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">Resume Template (Consulting)</h3>
                  <p class="text-sm text-gray-500 font-mono uppercase tracking-wider">DOCX • 500 KB</p>
                </div>
              </div>
              <button class="px-6 py-2 text-xs font-bold uppercase tracking-widest text-white border border-white/20 rounded-sm hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
                Download
              </button>
            </li>

          </ul>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ResourcesComponent { }
