import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface TypeEvenement {
  _id?: string;
  name: string;
  libele: string;
}
@Injectable({
  providedIn: 'root'
})
export class TypeEvenementService {

  private apiUrl = 'http://localhost:9090/TypeEvenement';

  constructor(private http: HttpClient) {}

  getTypeEvenements(): Observable<TypeEvenement[]> {
    return this.http.get<TypeEvenement[]>(this.apiUrl);
  }

  getTypeEvenementById(id: string): Observable<TypeEvenement> {
    return this.http.get<TypeEvenement>(`${this.apiUrl}/${id}`);
  }

  createTypeEvenement(typeEvenement: TypeEvenement): Observable<TypeEvenement> {
    return this.http.post<TypeEvenement>(this.apiUrl, typeEvenement);
  }

  updateTypeEvenement(id: string, typeEvenement: TypeEvenement): Observable<TypeEvenement> {
    return this.http.put<TypeEvenement>(`${this.apiUrl}/${id}`, typeEvenement);
  }

  deleteTypeEvenement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
