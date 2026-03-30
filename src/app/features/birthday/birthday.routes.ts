import { Routes } from '@angular/router';
import { BirthdayLandingComponent } from './components/birthday-landing/birthday-landing.component';
import { LetterToRodhaComponent } from './components/letter-to-rodha/letter-to-rodha.component';

export const routes: Routes = [
    {
        path: '',
        component: BirthdayLandingComponent
    },
    {
        path: 'letter',
        component: LetterToRodhaComponent
    }
];
