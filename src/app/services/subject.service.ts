import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(baseUrl+"/subject");
  }

  get(id: any): Observable<Subject> {
    return this.http.get<Subject>(`${baseUrl+"/subject"}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+"/subject", data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl+"/subject"}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl+"/subject"}/${id}`);
  }

}