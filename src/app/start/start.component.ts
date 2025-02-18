import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-start',
  standalone: true,
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  imports: [CommonModule, TranslateModule]
})
export class StartComponent {
  private translateService = inject(TranslateService);
  private router = inject(Router);
  private gameService = inject(GameService);


  constructor() {
    this.translateService.use('pl');
  }

  startGame(): void {
    this.gameService.startGame();
    this.router.navigate(['/game']);
  }
}
