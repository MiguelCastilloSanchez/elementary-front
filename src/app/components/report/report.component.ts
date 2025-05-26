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
groupedIrregularStudents: { [grade: string]: IrregularStudent[] } = {};

constructor(private reportService: reportService) {}

showSearchForm(type: 'student' | 'subject') {
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
      this.regularStudents = data;
    });
}

loadIrregularStudents() {
  this.clearReport();
  this.reportService.getIrregularStudents().subscribe(data => {
    // Combina todos los arrays de estudiantes en uno solo
    const allIrregulars = Object.values(data).flat();
    this.irregularStudents = allIrregulars;
  });
}

clearReport(){
  this.activeForm = null;
  this.searchedStudent = null;
  this.searchedSubject = null;
  this.regularStudents = [];
  this.irregularStudents = [];

}



}
