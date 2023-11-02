import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreSharingService } from '../score-sharing.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questions = [
    {
      id: 0,
      question: 'What is the largest mammal on Earth?',
      options: ['Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
      answer: 'Blue Whale',
    },
    {
      id: 1,
      question:
        'Which gas do plants absorb from the atmosphere during photosynthesis?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      answer: 'Carbon Dioxide',
    },
    {
      id: 2,
      question: 'What is the chemical symbol for gold?',
      options: ['Go', 'Ag', 'Au', 'Ge'],
      answer: 'Au',
    },
    {
      id: 3,
      question:
        "Which planet is known as the 'Morning Star' or 'Evening Star' due to its brightness?",
      options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
      answer: 'Venus',
    },
    {
      id: 4,
      question: 'What is the largest organ in the human body?',
      options: ['Heart', 'Skin', 'Liver', 'Lungs'],
      answer: 'Skin',
    },
  ];

  currentQues: any;
  selectedAnswer: string | undefined;
  noAnswerErr: boolean = false;

  score = {
    correctAnsCount: 0,
    totalQuesCount: this.questions.length,
  };

  constructor(
    private router: Router,
    private scoreSharingService: ScoreSharingService
  ) {}

  ngOnInit(): void {
    if (this.questions.length > 0) {
      this.currentQues = this.questions[0];
      console.log('Initial Question', this.currentQues);
    }
  }

  onSelectAnswer(selectedOption: any) {
    console.log(selectedOption);
    this.noAnswerErr = false;
    this.selectedAnswer = selectedOption;
  }

  onClickNext(currentQuestion: any) {
    console.log(currentQuestion.id);

    // Calcuate score
    if (this.selectedAnswer) {
      console.log(this.selectedAnswer, currentQuestion.answer);

      if (this.selectedAnswer === currentQuestion.answer) {
        this.score.correctAnsCount++;
      }

      this.selectedAnswer = undefined;
    } else {
      // Throw error
      console.log('No answers selected!');
      this.noAnswerErr = true;
    }

    // Show next question

    if (this.noAnswerErr === false) {
      if (currentQuestion.id < this.questions.length - 1) {
        this.currentQues = this.questions[currentQuestion.id + 1];
        console.log('Next Question', this.currentQues);
      } else {
        console.log(this.score);
        this.scoreSharingService.setFinalScore(this.score);
        this.router.navigate(['/result']);
      }
    }
  }
}
