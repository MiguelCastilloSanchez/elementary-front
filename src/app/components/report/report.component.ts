import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { reportService } from '../../services/report.service'; 
import { Student } from '../../models/student.model';
import { IrregularStudent } from '../../models/irregularStudent.model';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
activeForm: 'student' | 'subject' | null = null;
studentEnrollment: string = '';
subjectName: string = '';

searchedStudent: any = null;
searchedSubject: any = null;

regularStudents: Student[] = [];
irregularStudents: IrregularStudent[] = [];
groupedRegularStudents: { [grade: string]: Student[] } = {};
groupedIrregularStudents: { [grade: string]: IrregularStudent[] } = {};

constructor(private reportService: reportService) {}

showSearchForm(type: 'student' | 'subject') {
  this.clearReport();
  this.activeForm = type;
}

  searchStudent(): void {
    this.clearReport();
    this.reportService.getStudentReport(this.studentEnrollment).subscribe(data => {
      this.searchedStudent = data;
    });
  }

searchSubject() {
  this.clearReport();
    this.reportService.getSubjectReport(this.subjectName).subscribe(data => {
      this.searchedSubject = data;
    });
}

loadRegularStudents() {
  this.clearReport();
  this.reportService.getRegularStudents().subscribe(data => {
    this.groupedRegularStudents = this.groupByGrade(data);
  });
}



groupByGrade(students: Student[]): { [grade: string]: Student[] } {
  const grouped: { [grade: string]: Student[] } = {};

  for (const student of students) {
    const grade = student.grade

    if (!grouped[grade]) {
      grouped[grade] = [];
    }

    grouped[grade].push(student);
  }

  return grouped;
}

loadIrregularStudents() {
  this.clearReport();
  this.reportService.getIrregularStudents().subscribe(data => {
    this.groupedIrregularStudents = data;
  });
}

getIrregularGrades(): string[] {
  const gradeOrder = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH'];
  return gradeOrder.filter(grade => grade in this.groupedIrregularStudents);
}



clearReport(){
  this.activeForm = null;
  this.searchedStudent = null;
  this.searchedSubject = null;
  this.regularStudents = [];
  this.irregularStudents = [];
  this.groupedRegularStudents = {};
  this.groupedIrregularStudents = {};
}

getGrades(): string[] {
  return Object.keys(this.groupedRegularStudents);
}

}
