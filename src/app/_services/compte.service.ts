import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compte } from '@app/_models/compte';
import { Observable } from 'rxjs';

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

  public getCompteById(id:string):Observable<Compte>
  {
    return this.httpClient.get<Compte>(this.url+'/'+id);
  }
}
