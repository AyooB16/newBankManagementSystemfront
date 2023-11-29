import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgentLoginService {
  private apiUrl = 'http://localhost:3000/agent'; // Update with your backend API URL

  constructor(private http: HttpClient,private route:Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email: username, password });
  }
  
  getData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.route.navigate(['login'])
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/data`, { headers });
  }
}