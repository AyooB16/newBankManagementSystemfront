import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '@app/_models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:3000/client';

  constructor(private httpClient: HttpClient) {}

  public getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.url);
  }

  public createClient(Client: Object): Observable<Object> {
    return this.httpClient.post(this.url, Client);
  }

  public deleteClient(id: number): Observable<Object> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  public updateClient(id:String,Client:Object):Observable<Client>
  {
    return this.httpClient.put<Client>(this.url+"/"+id,Client)
  }

  public getClientById(id:String):Observable<Client>
  {
    return this.httpClient.get<Client>(this.url+'/'+id);
  }
}
