import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameState } from '../../services/game-state';
import { AssetLoaderService } from '../../services/asset-loader.service';
import confetti from 'canvas-confetti';

@Component({
    selector: 'app-final-cutscene',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed inset-0 overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      
      <!-- Background -->
      <div class="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000" 
           style="background-image: url('/assets/bg_observatory.png');">
           <div class="absolute inset-0 bg-black/40"></div>
           
           <!-- Twinkling Stars Effect (CSS based) -->
           <div class="stars absolute inset-0"></div>
      </div>

      <!-- Main Content Area -->
      <div class="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center min-h-[60vh] justify-center">
        
        <!-- Panel 1: Arrival -->
        <div *ngIf="panelIndex() === 0" class="text-center animate-fade-in">
             <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                <p class="text-2xl md:text-3xl text-white font-serif leading-relaxed italic">
                    "Explorer Snehal... you made it." 🌙
                </p>
             </div>
        </div>

        <!-- Panel 2: Montage -->
        <div *ngIf="panelIndex() === 1" class="text-center w-full animate-fade-in">
             <div class="mb-8 flex flex-wrap justify-center gap-4">
                 <span *ngFor="let word of gameState.memoryWords(); let i = index" 
                       class="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-lg animate-float"
                       [style.animation-delay]="i * 0.2 + 's'">
                     {{ word }}.
                 </span>
             </div>
             
             <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl inline-block">
                <p class="text-xl text-white font-medium">
                    "That’s you. That’s what I see."
                </p>
             </div>
        </div>

        <!-- Panel 3: Heart Line -->
        <div *ngIf="panelIndex() === 2" class="text-center animate-fade-in">
             <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl space-y-6">
                <p class="text-2xl text-white font-light">
                    "Somewhere in my ordinary days, you became home."
                </p>
                <p class="text-2xl text-pink-200 font-medium">
                    "I don’t want loud love for a day. I want steady love for years."
                </p>
             </div>
        </div>

        <!-- Panel 4: The Proposal -->
        <div *ngIf="panelIndex() === 3" class="text-center w-full animate-scale-up relative">
             
             <!-- Proposal Text -->
             <div class="mb-12 space-y-4">
                <p class="text-xl text-gray-300 uppercase tracking-widest font-bold">So here’s my real question...</p>
                <h1 class="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-xl">
                    "Will you hold my hand — and be mine, for real?" 💍🫶
                </h1>
             </div>

             <!-- Buttons Container -->
             <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 h-32 relative">
                 
                 <!-- YES Button -->
                 <button (click)="handleYes()" 
                         class="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-2xl rounded-full shadow-lg transform transition-all hover:scale-110 hover:shadow-pink-500/50 z-20">
                     YES ✨
                 </button>

                 <!-- NO Button (The Gag) -->
                 <div class="relative w-40 h-16"> <!-- Wrapper to contain movement if needed, or absolute positioning -->
                    <button #noButton
                            (click)="handleNo()"
                            class="absolute top-0 left-0 w-full h-full px-8 py-3 bg-gray-600 hover:bg-gray-500 text-white font-bold text-xl rounded-full shadow-lg transition-all duration-300 z-10"
                            [style.transform]="noButtonTransform()"
                            [class.bg-green-500]="noClickCount() >= 3"
                            [class.hover:bg-green-400]="noClickCount() >= 3">
                        {{ noButtonText() }}
                    </button>
                 </div>

             </div>
        </div>

        <!-- Win Screen Overlay -->
        <div *ngIf="showWin()" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <!-- Confetti Canvas -->
            <canvas #confettiCanvas class="absolute inset-0 pointer-events-none"></canvas>
            
            <div class="relative z-10 text-center space-y-8 p-8 max-w-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
                <h1 class="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 drop-shadow-xl mb-4">
                    She said YES! 🏆
                </h1>
                
                <p class="text-2xl text-white font-medium">
                    "Achievement unlocked: Now I’m officially your problem." 😌💛
                </p>

                <div class="flex flex-col md:flex-row gap-4 justify-center mt-8">
                    <button (click)="replay()" class="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold border border-white/30 backdrop-blur-md transition-all">
                        Replay Memory 🔄
                    </button>
                    <button (click)="goHome()" class="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold shadow-lg transition-all">
                        Back to Portfolio 🏠
                    </button>
                </div>
            </div>
        </div>

      </div>

      <!-- Navigation / Tap to Continue (Panels 0-2) -->
      <div *ngIf="panelIndex() < 3" 
           (click)="nextPanel()"
           class="absolute inset-0 z-20 cursor-pointer"
           title="Tap to continue">
           <!-- Hand hint at bottom -->
           <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce text-sm font-bold uppercase tracking-widest">
               Tap to continue
           </div>
      </div>

      <!-- Companion Area -->
      <div class="absolute bottom-0 right-4 md:right-10 z-10 w-32 md:w-56 pointer-events-none transition-all duration-500"
           [class.opacity-0]="showWin()"> <!-- Hide on win screen if needed, or keep -->
          
          <!-- Dialogue Bubble -->
          <div *ngIf="companionMessage()" class="absolute bottom-full right-0 mb-4 w-64 bg-white text-gray-800 p-4 rounded-2xl rounded-br-none shadow-xl animate-pop-in z-20">
              <p class="font-medium text-lg leading-snug">{{ companionMessage() }}</p>
          </div>

          <img [src]="companionImage()" class="w-full object-contain filter drop-shadow-2xl" alt="Companion">
      </div>

    </div>
  `,
    styles: [`
    .stars {
        background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
        background-repeat: repeat;
        background-size: 200px 200px;
        animation: twinkle 4s infinite;
        opacity: 0.6;
    }
    @keyframes twinkle {
        0% { transform: translateY(0); opacity: 0.6; }
        50% { opacity: 0.3; }
        100% { transform: translateY(-20px); opacity: 0.6; }
    }
    .animate-float { animation: float 3s ease-in-out infinite; }
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    .animate-fade-in { animation: fadeIn 1s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-scale-up { animation: scaleUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `]
})
export class FinalCutsceneComponent implements OnInit {

    panelIndex = signal(0);
    noClickCount = signal(0);
    showWin = signal(false);
    companionMessage = signal('');

    // "No" Button State
    noButtonText = computed(() => {
        if (this.noClickCount() >= 3) return "Okay fine... YES 🙃";
        return "No 🙃";
    });

    noButtonTransform = signal('');

    readonly companionImage = computed(() => {
        const companion = this.gameState.companion();
        let mood = 'idle';
        if (this.panelIndex() === 3) mood = 'shy'; // or special propose pose
        if (this.showWin()) mood = 'happy';
        return this.assetLoader.getCharacterImage(companion, mood); // asset loader handles fallback
    });

    constructor(
        private router: Router,
        public gameState: GameState,
        public assetLoader: AssetLoaderService
    ) { }

    ngOnInit() {
        // Start ambiance?
    }

    nextPanel() {
        if (this.panelIndex() < 3) {
            this.panelIndex.update(i => i + 1);
            this.companionMessage.set(''); // Clear prev message
        }
    }

    handleNo() {
        const count = this.noClickCount();

        if (count === 0) {
            // Attempt 1: Shake
            this.companionMessage.set("Nice try. You pressed the ‘I’m shy’ button. 🙈");
            this.shakeButton();
        } else if (count === 1) {
            // Attempt 2: Run away
            this.companionMessage.set("Okay calm down, I didn’t ask for your Netflix password. 😭");
            this.noButtonTransform.set("translateX(150px) rotate(15deg)");
        } else if (count === 2) {
            // Attempt 3: Return as Yes
            this.companionMessage.set("Good. Because I already informed the stars. 🌙✨");
            this.noButtonTransform.set("translateX(0) rotate(0)");
        } else {
            // It's effectively a YES now
            this.handleYes();
            return;
        }

        this.noClickCount.update(c => c + 1);
    }

    shakeButton() {
        // Simple hack for now:
        this.noButtonTransform.set("translateX(-10px)");
        setTimeout(() => this.noButtonTransform.set("translateX(10px)"), 100);
        setTimeout(() => this.noButtonTransform.set("translateX(-10px)"), 200);
        setTimeout(() => this.noButtonTransform.set("translateX(0)"), 300);
    }

    handleYes() {
        this.showWin.set(true);
        this.launchConfetti();
    }

    replay() {
        this.gameState.resetGame();
        this.router.navigate(['/valentine/start']);
    }

    goHome() {
        this.router.navigate(['/']);
    }

    // Simple Confetti Implementation
    launchConfetti() {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }
}
