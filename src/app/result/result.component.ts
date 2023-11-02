import { Component, OnInit } from '@angular/core';
import { ScoreSharingService } from '../score-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  finalScore: any;

  constructor(private scoreSharingService: ScoreSharingService, private router: Router) {}

  ngOnInit(): void {
    if (this.scoreSharingService.getFinalScore()) {
      this.finalScore = this.scoreSharingService.getFinalScore();
      console.log('Final Score', this.finalScore);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
