import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9090/User';
  constructor(
    private http : HttpClient
  ) { }

  login(data:any){
    return this.http.post("http://localhost:9090/User/login" , data)
  }
}
