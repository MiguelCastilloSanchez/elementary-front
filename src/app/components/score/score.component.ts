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
  score: Score = {};
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
    if (this.isEditing && this.currentId !== null) {
      this.scoreService.update(this.currentId, this.score).subscribe(() => {
        this.getScores();
        this.resetForm();
      });
    } else {
      this.scoreService.create(this.score).subscribe(() => {
        this.getScores();
        this.resetForm();
      });
    }
  }

  editScore(score: Score): void {
    this.score = { ...score };
    this.currentId = (score as any).scoreId ?? null;
    this.isEditing = true;
  }

  deleteScore(id: any): void {
    this.scoreService.delete(id).subscribe(() => {
      this.getScores();
    });
  }

  resetForm(): void {
    this.score = {};
    this.isEditing = false;
    this.currentId = null;
  }
}
