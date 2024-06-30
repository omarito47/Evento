

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evenement {
  _id?: string;
  name: string;
  description: string;
  DateDebut: Date;
  DateFin: Date;
  heure: string;
  lieu: string;
  PriceTicket: number;
  nombreParticipant: number;
  typeEvent: string;
  userEvenement: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:9090/evenements';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl);
  }

  getById(id: string): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.apiUrl}/${id}`);
  }

  add(evenement: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(this.apiUrl, evenement);
  }

  update(id: string, evenement: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.apiUrl}/${id}`, evenement);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

