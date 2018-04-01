import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Ingrediente } from './ingrediente';
import { INGREDIENTES } from './mock-ingrediente';
import { MessageService } from '../messages/message.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

 
@Injectable()
export class IngredienteService {  
  private ingredienteURL = 'http://127.0.0.1:8080/ingredientes';
  private url = 'http://127.0.0.1:8080/ingrediente/';
  constructor( 
    private http: Http,
    private httpClient: HttpClient,
    private messageService: MessageService){
  }
  
  getListaIngredientes(): Observable<Ingrediente[]> {
    return this.http.get(this.ingredienteURL)
    .map((response: Response) => <Ingrediente>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
  }
  getIngrediente(id:number){
     const url = `${this.ingredienteURL}/${id}`;
     return this.http.get(this.ingredienteURL)
    .map((response: Response) => <Ingrediente>response.json())
            .do(data => console.log('Unitário: ' + JSON.stringify(data)))
            .catch(this.handleError);
  }

  update (ing: Ingrediente): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})};
    const url = `${this.url}`;
    return this.httpClient.post(url, ing, httpOptions).pipe(
      tap(_ => this.log(httpOptions.headers+"")),
      catchError(this.handleErrorOperation<any>('Erro na atualização do ingrediente'))
    );
  }
  
  private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    private handleErrorOperation<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); 
        this.log(`${operation} falhou: ${error.message}`);
        return of(result as T);
      };
    }

  private log(message: string) {
    console.log(message);
  }
}