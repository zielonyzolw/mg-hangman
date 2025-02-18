import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { GameComponent } from './game/game.component';
import { GameGuard } from './guards/game.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'game', component: GameComponent, canActivate: [GameGuard] },
  { path: '**', redirectTo: 'start' }
];
