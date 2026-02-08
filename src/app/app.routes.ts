import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { AdventureComponent } from './components/adventure/adventure.component';

export const routes: Routes = [
    { path: '', component: HomeLayoutComponent },
    { path: 'adventure', component: AdventureComponent },
    {
        path: 'valentine',
        loadChildren: () => import('./features/valentine-game/valentine-game.module').then(m => m.ValentineGameModule)
    },
    { path: '**', redirectTo: '' }
];
