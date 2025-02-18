import { Component, Inject, inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-end-modal',
  standalone: true,
  templateUrl: './end-modal.component.html',
  styleUrls: ['./end-modal.component.scss'],
  imports: [CommonModule, TranslateModule],
  encapsulation: ViewEncapsulation.None
})
export class EndModalComponent {
  private router = inject(Router);
  private gameService = inject(GameService);

  constructor(
    public dialogRef: MatDialogRef<EndModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { time: string; success?: boolean }
  ) {}

  restartGame(): void {
    this.gameService.startGame();
    this.dialogRef.close();
    this.router.navigate(['/game']);
  }
}
