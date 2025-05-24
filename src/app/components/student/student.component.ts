import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  studentForm!: FormGroup;
  editing: boolean = false;
  selectedStudentId?: string;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllStudents();
    this.initForm();
  }

  initForm() {
    this.studentForm = this.fb.group({
      enrollment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', Validators.required],
      grade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getAllStudents() {
    this.studentService.getAll().subscribe(data => {
      this.students = data;
    });
  }

  submitForm() {
    if (this.studentForm.invalid) return;

    if (this.editing && this.selectedStudentId) {
      this.studentService.update(this.selectedStudentId, this.studentForm.value).subscribe(() => {
        this.getAllStudents();
        this.cancelEdit();
      });
    } else {
      this.studentService.create(this.studentForm.value).subscribe(() => {
        this.getAllStudents();
        this.studentForm.reset();
      });
    }
  }

  editStudent(student: Student) {
    this.editing = true;
    this.selectedStudentId = student.enrollment;
    this.studentForm.patchValue(student);
  }

  deleteStudent(id: string) {
    this.studentService.delete(id).subscribe(() => {
      this.getAllStudents();
    });
  }

  cancelEdit() {
    this.editing = false;
    this.selectedStudentId = undefined;
    this.studentForm.reset();
  }
}
