import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-knowledge-hub',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-black pt-24 pb-16 px-4">
      <div class="container mx-auto">
        <h2 class="text-4xl md:text-6xl font-serif font-bold mb-12 text-white text-center tracking-tighter">
          Insights
        </h2>
        
        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
          
          <!-- Large Feature Card (Span 2x2) -->
          <div class="glass-card p-8 rounded-sm md:col-span-2 md:row-span-2 flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-white/30 transition-colors bg-black">
             <div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg class="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
            </div>
            <div>
                <span class="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold tracking-widest text-white uppercase border border-white/20 rounded-sm">Strategy</span>
                <h3 class="text-3xl font-bold text-white mb-4">Market Entry Frameworks</h3>
                <p class="text-gray-400 leading-relaxed text-lg font-light">
                  A comprehensive guide to analyzing new markets, assessing competition, and identifying growth opportunities using the 3C's model.
                </p>
            </div>
            <div class="mt-8 flex items-center text-sm text-gray-400 font-mono group-hover:text-white transition-colors">
              <span>READ FULL INSIGHT</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </div>

          <!-- Tall Card (Span 1x2) -->
          <div class="glass-card p-6 rounded-sm md:col-span-1 md:row-span-2 flex flex-col justify-between group cursor-pointer bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
             <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg class="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Supply Chain Optimization</h3>
            <p class="text-gray-400 text-sm mb-4 font-light">
              Reducing inefficiencies in logistics through data-driven analysis.
            </p>
             <div class="mt-auto">
                <div class="h-0.5 w-12 bg-white rounded-full mb-2 opacity-50"></div>
                <span class="text-xs text-gray-400 uppercase tracking-widest font-mono">Operations</span>
             </div>
          </div>

          <!-- Small Card 1 -->
           <div class="glass-card p-6 rounded-sm md:col-span-1 flex flex-col justify-center group cursor-pointer hover:bg-white/10 transition-colors border border-white/10">
              <span class="text-white text-4xl font-serif font-bold mb-1 italic">15+</span>
              <span class="text-gray-500 text-xs font-mono uppercase tracking-widest">Case Studies</span>
           </div>

           <!-- Small Card 2 -->
           <div class="glass-card p-6 rounded-sm md:col-span-1 flex flex-col justify-center group cursor-pointer hover:bg-white/10 transition-colors border border-white/10">
              <span class="text-white text-4xl font-serif font-bold mb-1 italic">5</span>
              <span class="text-gray-500 text-xs font-mono uppercase tracking-widest">Industries</span>
           </div>

        </div>
      </div>
    </div>
  `,
  styles: []
})
export class KnowledgeHubComponent { }
