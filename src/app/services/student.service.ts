import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(baseUrl+"/student");
  }

  get(id: any): Observable<Student> {
    return this.http.get<Student>(`${baseUrl+"/student"}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+"/student", data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl+"/student"}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl+"/student"}/${id}`);
  }

}