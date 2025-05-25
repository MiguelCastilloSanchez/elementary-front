import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from '../models/score.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class scoreService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Score[]> {
    return this.http.get<Score[]>(baseUrl+"/score");
  }

  get(id: any): Observable<Score> {
    return this.http.get<Score>(`${baseUrl+"/score"}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+"/score", data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl+"/score"}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl+"/score"}/${id}`);
  }

}