import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:9090/reservation';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  add(reservation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }

  update(id: string, reservation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, reservation);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filterByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filter/${status}`);
  }

  cancel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cancel/${id}`);
  }
}
