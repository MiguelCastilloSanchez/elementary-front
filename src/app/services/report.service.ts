import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { IrregularStudent } from '../models/irregularStudent.model';

const baseUrl = 'http://localhost:8080/report';

@Injectable({
  providedIn: 'root'
})
export class reportService {

  constructor(private http: HttpClient) {}

  getStudentReport(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/student/${id}`);
  }

  getSubjectReport(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/subject/${id}`);
  }

  getRegularStudents(): Observable<Student[]> {
    return this.http.get<any[]>(`${baseUrl}/regular`);
  }

  getIrregularStudents(): Observable<IrregularStudent[]> {
    return this.http.get<any[]>(`${baseUrl}/irregular`);
  }
}
