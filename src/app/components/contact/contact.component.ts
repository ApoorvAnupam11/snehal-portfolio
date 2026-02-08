import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-black pt-20 pb-16 px-4 flex items-center border-t border-white/10">
      <div class="container mx-auto max-w-4xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Let's <span class="text-gray-500">Connect</span>
            </h2>
            <p class="text-gray-400 text-lg mb-8 leading-relaxed font-light">
              Whether it's a recruiting conversation, a student project, or case practice, I'd love to hear from you.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-center space-x-4 text-gray-300 group cursor-pointer">
                <div class="w-12 h-12 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <span class="font-mono text-sm tracking-wider">isnehaldhakate@gmail.com</span>
              </div>
              <div class="flex items-center space-x-4 text-gray-300 group cursor-pointer">
                <div class="w-12 h-12 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <a href="https://www.linkedin.com/in/snehal-dhakate-797254246/" target="_blank" class="font-mono text-sm tracking-wider hover:text-white transition-colors">snehaldhakate</a>
              </div>
            </div>
          </div>

          <div class="glass-card p-8 rounded-sm border border-white/10">
            <form class="space-y-6">
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                <input type="text" class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-sm text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors font-light" placeholder="John Doe">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input type="email" class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-sm text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors font-light" placeholder="john@example.com">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea rows="4" class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-sm text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors font-light" placeholder="How can I help you?"></textarea>
              </div>
              <button type="submit" class="w-full py-4 bg-white hover:bg-gray-200 text-black rounded-sm font-bold uppercase tracking-widest transition-all transform hover:translate-y-[-1px] shadow-lg text-sm">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContactComponent { }
