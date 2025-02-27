import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);

  private words: string[] = [];
  private selectedWords: string[] = [];

  public currentStage = 0;
  public guessedLetters: string[] = [];
  public wrongAttempts = 0;
  public maxAttempts = 6;
  public gameStartTime: number = 0;

  private gameOverSubject = new BehaviorSubject<boolean>(false);
  gameOver$ = this.gameOverSubject.asObservable();

  private gameWon = false;

  loadWords(): Observable<any> {
    return this.http.get('assets/answers.json');
  }

  startGame(): void {
    this.currentStage = 0;
    this.wrongAttempts = 0;
    this.guessedLetters = [];
    this.gameStartTime = Date.now();
    sessionStorage.setItem('gameStarted', 'true');
    this.gameWon = false;

    console.log('🔄 Start gry. Aktualne słowo:', this.getCurrentWord());
  }

  setWords(words: string[]): void {
    this.words = words;
    this.selectedWords = this.shuffleArray(words).slice(0, 5);
    console.log('🔍 Wybrane słowa (kolejność):', this.selectedWords);
  }

  getCurrentWord(): string {
    return this.selectedWords[this.currentStage] || '';
  }

  getMaskedWord(): string {
    return this.getCurrentWord()
      .split('')
      .map(letter => (this.guessedLetters.includes(letter) ? letter : '_'))
      .join(' ');
  }

  guessLetter(letter: string): void {
    if (!this.guessedLetters.includes(letter)) {
      this.guessedLetters.push(letter);
      if (!this.getCurrentWord().includes(letter)) {
        this.wrongAttempts++;
        if (this.wrongAttempts >= this.maxAttempts) {
          sessionStorage.removeItem('gameStarted');
          this.gameWon = false;
          this.gameOverSubject.next(true);
        }
      } else {
        if (this.isWordGuessed()) {
          this.nextStage();
        }
      }
    }
  }

  isWordGuessed(): boolean {
    return this.getCurrentWord()
      .split('')
      .every(letter => this.guessedLetters.includes(letter));
  }

  nextStage(): void {
    if (this.currentStage < 4) {
      this.currentStage++;
      this.guessedLetters = [];
      this.wrongAttempts = 0;
      console.log('🆕 Następny etap! Aktualne słowo:', this.getCurrentWord());
    } else {
      sessionStorage.removeItem('gameStarted');
      this.gameWon = true;
      this.gameOverSubject.next(true);
    }
  }

  isGameWon(): boolean {
    return this.gameWon;
  }

  private shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
