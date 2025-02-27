import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameService } from '../services/game.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EndModalComponent } from '../end-modal/end-modal.component';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [CommonModule, TranslateModule, MatDialogModule]
})
export class GameComponent implements OnInit {
  private gameService = inject(GameService);
  private dialog = inject(MatDialog);
  private translateService = inject(TranslateService);

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor() {
    this.translateService.use('pl');
  }

  ngOnInit(): void {
    this.gameService.loadWords().subscribe({
      next: (data) => {
        this.gameService.setWords(data.words);
        this.gameService.startGame();
      },
      error: (err) => console.error(err)
    });

    this.gameService.gameOver$.subscribe((isGameOver) => {
      if (isGameOver) {
        this.openEndModal();
      }
    });
  }

  guessLetter(letter: string): void {
    this.gameService.guessLetter(letter);
  }

  openEndModal(): void {
    const gameTime = ((Date.now() - this.gameService.gameStartTime) / 1000).toFixed(2);
    const wasGameWon = this.gameService.isGameWon();

    this.dialog.open(EndModalComponent, {
      data: { time: gameTime, success: wasGameWon },
      panelClass: 'end-modal-container'
    });
  }

  get gameData() {
    return this.gameService;
  }
}
