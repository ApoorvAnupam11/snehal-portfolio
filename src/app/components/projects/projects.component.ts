import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-black pt-24 pb-16 px-4">
      <div class="container mx-auto">
        <h2 class="text-4xl md:text-6xl font-serif font-bold mb-12 text-white text-center tracking-tighter">
          Selected Works
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          
          <!-- Hero Project (Span 2x2) -->
          <div class="glass-card p-0 rounded-sm md:col-span-2 md:row-span-2 flex flex-col group cursor-pointer border border-white/10 hover:border-white/30 transition-colors bg-black/40">
            <div class="h-64 overflow-hidden relative border-b border-white/5">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Retail Strategy" class="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div class="p-8 flex-1 flex flex-col justify-between">
                <div>
                    <span class="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold tracking-widest text-white uppercase border border-white/20 rounded-sm">Retail Sector</span>
                    <h3 class="text-3xl font-bold text-white mb-4">Digital Transformation Strategy</h3>
                    <p class="text-gray-400 leading-relaxed text-lg font-light">
                      Redesigned e-commerce strategy for a Fortune 500 retailer, driving 15% sales growth through omnichannel integration and customer journey mapping.
                    </p>
                </div>
                <div class="mt-8 flex items-center text-sm text-gray-400 font-mono group-hover:text-white transition-colors">
                  <span>VIEW CASE STUDY</span>
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
            </div>
          </div>

          <!-- Vertical Project (Span 1x2) -->
          <div class="glass-card p-0 rounded-sm md:col-span-1 md:row-span-2 flex flex-col group cursor-pointer bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
            <div class="h-48 overflow-hidden relative border-b border-white/5">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="FinTech" class="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-700">
             </div>
             <div class="p-6 flex-1 flex flex-col">
                <span class="text-gray-500 text-xs font-mono uppercase tracking-widest mb-3">FinTech</span>
                <h3 class="text-xl font-bold text-white mb-4">Market Expansion</h3>
                <p class="text-gray-400 text-sm mb-6 font-light leading-relaxed">
                  Developed a comprehensive go-to-market strategy for a European FinTech unicorn expanding into Southeast Asia.
                </p>
                <div class="mt-auto">
                    <div class="h-0.5 w-12 bg-white rounded-full mb-2 opacity-50"></div>
                    <span class="text-xs text-gray-400 uppercase tracking-widest font-mono">Growth</span>
                </div>
             </div>
          </div>

           <!-- Small Project 1 -->
          <div class="glass-card p-6 rounded-sm md:col-span-1 flex flex-col justify-center group cursor-pointer hover:bg-white/10 transition-colors border border-white/10">
              <div class="flex items-start justify-between mb-4">
                 <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                 </div>
                 <span class="text-xs font-mono text-gray-500">2026</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Non-Profit Efficiency</h3>
              <p class="text-gray-400 text-xs font-mono uppercase tracking-widest">Pro Bono</p>
          </div>
          
           <!-- Small Project 2 -->
          <div class="glass-card p-0 rounded-sm md:col-span-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col md:flex-row overflow-hidden group cursor-pointer">
             <div class="w-full md:w-48 h-32 md:h-auto overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" alt="Dashboard" class="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-700">
             </div>
             <div class="p-6 flex flex-col justify-center flex-1">
                <h3 class="text-xl font-bold text-white mb-2">Executive Dashboard</h3>
                <p class="text-gray-400 text-sm font-light">Interactive Tableau reporting suite for C-suite decision making.</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProjectsComponent { }
