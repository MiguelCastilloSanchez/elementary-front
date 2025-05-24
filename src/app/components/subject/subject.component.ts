import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../models/subject.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  subject: Subject = {};
  isEditing: boolean = false;
  currentIndex: number = -1;

  grades: string[] = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH'];

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.getAll().subscribe(data => {
      this.subjects = data;
    });
  }

  saveSubject(): void {
    if (this.isEditing && this.subject.subjectName) {
      this.subjectService.update(this.subject.subjectName, this.subject).subscribe(() => {
        this.getSubjects();
        this.resetForm();
      });
    } else {
      this.subjectService.create(this.subject).subscribe(() => {
        this.getSubjects();
        this.resetForm();
      });
    }
  }

  editSubject(subject: Subject, index: number): void {
    this.subject = { ...subject };
    this.isEditing = true;
    this.currentIndex = index;
  }

  deleteSubject(subjectName: string): void {
    this.subjectService.delete(subjectName).subscribe(() => {
      this.getSubjects();
    });
  }

  resetForm(): void {
    this.subject = {};
    this.isEditing = false;
    this.currentIndex = -1;
  }
}
