import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '../landing/landing.component';
import { KnowledgeHubComponent } from '../knowledge-hub/knowledge-hub.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ResourcesComponent } from '../resources/resources.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
    selector: 'app-home-layout',
    standalone: true,
    imports: [
        CommonModule,
        LandingComponent,
        KnowledgeHubComponent,
        ProjectsComponent,
        ResourcesComponent,
        ContactComponent
    ],
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {
    isMenuOpen = false;

    constructor(private el: ElementRef) { }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach((card: any) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    scrollToSection(sectionId: string) {
        this.isMenuOpen = false; // Close menu on selection
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
