import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeCompte } from '@app/_models/type-compte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeCompteService {
  private url = 'http://localhost:3000/typecompte';

  constructor(private httpClient: HttpClient) {}

  public getTypeComptes(): Observable<TypeCompte[]> {
    return this.httpClient.get<TypeCompte[]>(this.url);
  }

  public createTypeCompte(TypeCompte: Object): Observable<Object> {
    return this.httpClient.post(this.url, TypeCompte);
  }

  public deleteTypeCompte(id: number): Observable<Object> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  public updateTypeCompte(id:number,TypeCompte:Object):Observable<TypeCompte>
  {
    return this.httpClient.put<TypeCompte>(this.url+"/"+id,TypeCompte)
  }

  public getTypeCompteById(id:number):Observable<TypeCompte>
  {
    
    return this.httpClient.get<TypeCompte>(this.url+'/'+id);
  }
}
