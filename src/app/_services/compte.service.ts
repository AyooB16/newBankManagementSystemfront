import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compte } from '@app/_models/compte';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private url = 'http://localhost:3000/compte';

  constructor(private httpClient: HttpClient) {}

  public getComptes(): Observable<Compte[]> {
    return this.httpClient.get<Compte[]>(this.url);
  }

  public createCompte(Compte: Object): Observable<Object> {
    return this.httpClient.post(this.url, Compte);
  }

  public deleteCompte(id: string): Observable<Object> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  public updateCompte(id:string,Compte:Object):Observable<Compte>
  {
    return this.httpClient.put<Compte>(this.url+"/"+id,Compte)
  }
  public debiterCompte(id:string,m:Number):Observable<Compte>
  {
    return this.httpClient.post<Compte>(this.url+"/debiter/"+id,{montant:m})
  }
  public crediterCompte(id:string,m:Number):Observable<Compte>
  {
    return this.httpClient.post<Compte>(this.url+"/crediter/"+id,{montant:m})
  }
  
  
  public getCompteByToken(token:any):Observable<Compte>
  {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });

    return this.httpClient.get<Compte>(`${this.url}/bytoken`, {headers});

  }

  sendMoney(toUsername: string, amount: number): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const body = {
      toUsername,
      amount
    };

    return this.httpClient.post(`${this.url}/send-money`, body, { headers });
  }

  public getCompteById(id:string):Observable<Compte>
  {
    return this.httpClient.get<Compte>(this.url+'/byid/'+id);
  }
  public login(username: string, password: string) {
    return this.httpClient.post<any>(`${this.url}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
