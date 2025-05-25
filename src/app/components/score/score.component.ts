import { Component, OnInit } from '@angular/core';
import { Score } from '../../models/score.model';
import { scoreService } from '../../services/score.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  scores: Score[] = [];
  score: Score = {
    student: {},
    subject: {}
  };
  isEditing = false;
  currentId: number | null = null;

  constructor(private scoreService: scoreService) {}

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this.scoreService.getAll().subscribe(data => {
      this.scores = data;
    });
  }


  saveScore(): void {
  const dto = {
    enrollment: this.score.student?.enrollment ?? '',
    subjectName: this.score.subject?.subjectName ?? '',
    score: this.score.score,
    startDate: this.score.startDate,
    endDate: this.score.endDate,
  };

  if (this.isEditing && this.currentId !== null) {
    this.scoreService.update(this.currentId, dto).subscribe(() => {
      this.getScores();
      this.resetForm();
    });
  } else {
    this.scoreService.create(dto).subscribe(() => {
      this.getScores();
      this.resetForm();
    });
  }
}


  editScore(score: Score): void {
    this.score = { ...score,
      student: { ...score.student },
      subject: { ...score.subject }
     };
    this.currentId = (score as any).scoreId ?? null;
    this.isEditing = true;
  }

  deleteScore(id: any): void {
    this.scoreService.delete(id).subscribe(() => {
      this.getScores();
    });
  }

  resetForm(): void {
    this.score = {
      student: {},
      subject: {}
    };
    this.isEditing = false;
    this.currentId = null;
  }
}
