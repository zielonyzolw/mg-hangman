import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    const gameStarted = sessionStorage.getItem('gameStarted');
    if (gameStarted === 'true') {
      return true;
    } else {
      this.router.navigate(['/start']);
      return false;
    }
  }
}
