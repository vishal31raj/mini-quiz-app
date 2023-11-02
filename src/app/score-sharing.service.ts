import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreSharingService {
  private finalScore: any;

  setFinalScore(score: any) {
    this.finalScore = score;
  }

  getFinalScore() {
    return this.finalScore;
  }
}
