import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden pt-20 pb-24 perspective-container">
      
      <div class="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">
        <!-- Text Content -->
        <div class="text-left space-y-6 animate-fade-in-up order-2 md:order-1 relative z-20">
          <div class="inline-block px-3 py-1 border border-white/20 rounded-full text-gray-300 text-sm tracking-widest uppercase backdrop-blur-sm bg-white/5">
            Welcome to my Portfolio
          </div>
          <h1 class="text-4xl md:text-6xl font-bold font-serif leading-tight tracking-tighter mix-blend-difference">
            👋 Hi, I’m Snehal.
          </h1>
          <div class="max-w-lg space-y-4">
            <p class="text-xl text-gray-300 leading-relaxed font-light">
              Aspiring strategy consultant documenting case practice, project work, and frameworks.
            </p>
            <p class="text-base text-gray-500 leading-relaxed">
              I enjoy turning ambiguous business questions into clear problem statements, structured analysis, and decision-ready recommendations.
            </p>
          </div>
          
          <div class="flex gap-4 pt-6">
             <button class="px-8 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-sm transition-all transform hover:translate-y-[-2px]">
              View Work
            </button>
            <button class="px-8 py-3 border border-white/30 hover:border-white text-white rounded-sm font-medium transition-all backdrop-blur-sm hover:bg-white/5">
              Contact
            </button>
          </div>
        </div>

        <!-- 3D Hanging Badge Container -->
        <div class="relative h-[450px] md:h-[600px] flex justify-center items-start order-1 md:order-2 perspective-1000 transform scale-75 md:scale-100 origin-top">
            
            <!-- Lanyard String -->
            <div class="absolute top-0 left-1/2 w-1 h-[150px] bg-neutral-800 origin-top animate-swing z-10"></div>
            
            <!-- The Entire Hanging Assembly (Swings) -->
            <div class="hanging-assembly origin-top animate-swing absolute top-0 left-1/2 -translate-x-1/2">
                
                <!-- Lanyard Strap (Visual) -->
                <div class="w-4 h-[120px] mx-auto bg-neutral-900 border-x border-neutral-700 relative overflow-hidden">
                     <!-- N4 Pattern -->
                     <div class="absolute inset-0 opacity-30 flex flex-col items-center gap-4 py-2">
                        <span class="text-[8px] font-mono text-white transform -rotate-90">SNEHAL</span>
                        <span class="text-[8px] font-mono text-white transform -rotate-90">SNEHAL</span>
                     </div>
                </div>

                <!-- Clip Hardware -->
                <div class="w-12 h-12 mx-auto bg-neutral-400 rounded-sm -mt-2 relative z-20 flex items-center justify-center shadow-lg">
                    <div class="w-8 h-8 bg-black rounded-sm"></div>
                </div>

                <!-- The ID Card (Interactive Tilt) -->
                <div #cardElement class="id-card w-[300px] h-[450px] bg-[#e5e5e5] rounded-xl shadow-2xl relative -mt-4 z-10 overflow-hidden transform-style-3d transition-transform duration-100 ease-out">
                    
                    <!-- Soft Shadow Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none z-20"></div>

                    <!-- Card Header -->
                    <div class="h-24 bg-neutral-200 flex items-center justify-between px-6">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="text-[10px] font-mono text-neutral-500 tracking-widest">ID: 948302</div>
                    </div>

                    <!-- Photo Section -->
                    <div class="px-8 -mt-12 relative z-10">
                        <div class="w-40 h-52 bg-white p-2 shadow-sm rotate-1 mx-auto">
                           <div class="w-full h-full bg-neutral-800 overflow-hidden grayscale contrast-125">
                              <img src="assets/id-profile.jpg" 
                                   alt="Passport Photo" 
                                   class="w-full h-full object-cover mix-blend-luminosity"
                                   onerror="this.src='https://ui-avatars.com/api/?name=Snehal+Dhakate&background=random&color=fff&size=512'">
                           </div>
                        </div>
                    </div>

                    <!-- Text Content -->
                    <div class="text-center mt-6 space-y-2">
                        <h2 class="text-2xl font-bold text-neutral-900 font-sans tracking-tight">SNEHAL DHAKATE</h2>
                        <p class="text-xs font-mono text-neutral-500 uppercase tracking-widest">Strategy & Operations</p>
                    </div>

                    <!-- Badge Chip -->
                    <div class="mt-8 flex justify-center">
                        <div class="px-4 py-1.5 bg-black text-white rounded-full flex items-center gap-2 shadow-lg">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="text-[10px] font-bold uppercase tracking-wider">Available for work</span>
                        </div>
                    </div>

                    <!-- Barcode Footer -->
                    <div class="absolute bottom-6 left-0 w-full flex justify-center opacity-30">
                        <div class="h-8 w-4/5 bg-repeat-x" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMyIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')"></div>
                    </div>

                </div>

            </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .perspective-container {
      perspective: 2000px;
    }
    
    .perspective-1000 {
        perspective: 1000px;
    }

    .transform-style-3d {
        transform-style: preserve-3d;
    }

    .animate-swing {
        animation: swing 6s ease-in-out infinite;
    }

    @keyframes swing {
        0%, 100% { transform: translateX(-50%) rotate(1deg); }
        50% { transform: translateX(-50%) rotate(-1deg); }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    
    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LandingComponent {
  @ViewChild('cardElement') cardElement!: ElementRef;

  // Physics State
  private bounds: DOMRect | null = null;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.cardElement) return;

    const card = this.cardElement.nativeElement;
    if (!this.bounds) {
      this.bounds = card.getBoundingClientRect();
    }

    // Explicit check to ensure bounds is not null
    if (this.bounds) {
      // Calculate mouse position relative to card center
      const centerX = this.bounds.left + this.bounds.width / 2;
      const centerY = this.bounds.top + this.bounds.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Constrain rotation
      const rotateX = (mouseY / (window.innerHeight / 2)) * -15; // Max 15deg tilt
      const rotateY = (mouseX / (window.innerWidth / 2)) * 15;

      // Apply Transform
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.cardElement) {
      this.bounds = this.cardElement.nativeElement.getBoundingClientRect();
    }
  }
}
