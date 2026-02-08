import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameContainer } from './components/game-container/game-container.component';
import { StartScreen } from './components/start-screen/start-screen';

const routes: Routes = [
  {
    path: '',
    component: GameContainer,
    children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { path: 'start', component: StartScreen },
      { path: 'level-1', loadComponent: () => import('./components/level-1/level-1.component').then(m => m.Level1Component) },
      { path: 'level-2', loadComponent: () => import('./components/level-2/level-2.component').then(m => m.Level2Component) },
      { path: 'level-3', loadComponent: () => import('./components/level-3/level-3.component').then(m => m.Level3Component) },
      { path: 'bouquet-vault', loadComponent: () => import('./components/bouquet-vault/bouquet-vault.component').then(m => m.BouquetVaultComponent) },
      { path: 'final-cutscene', loadComponent: () => import('./components/final-cutscene/final-cutscene.component').then(m => m.FinalCutsceneComponent) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValentineGameRoutingModule { }
