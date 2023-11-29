import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agence } from '@app/_models/agence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  private url = 'http://localhost:3000/agence';

  constructor(private httpClient: HttpClient) {}

  public getAgences(): Observable<Agence[]> {
    return this.httpClient.get<Agence[]>(this.url);
  }

  public createAgence(Agence: Object): Observable<Object> {
    return this.httpClient.post(this.url, Agence);
  }

  public deleteAgence(id: number): Observable<Object> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  public updateAgence(id:number,Agence:Object):Observable<Agence>
  {
    return this.httpClient.put<Agence>(this.url+"/"+id,Agence)
  }

  public getAgenceById(id:number):Observable<Agence>
  {
    return this.httpClient.get<Agence>(this.url+'/'+id);
  }
}
