import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';

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
  constructor(
    private http: Http, 
    private messageService: MessageService){
  }
  getListaIngredientes(): Observable<Ingrediente[]> {
    this.messageService.add('Chamando Listagem de Ingredientes');
    return this.http.get(this.ingredienteURL)
    .map((response: Response) => <Ingrediente>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
  }
  getIngrediente(id:number){
     const url = `http://127.0.0.1:8080/ingrediente/${id}`;
     return this.http.get(this.ingredienteURL)
    .map((response: Response) => <Ingrediente>response.json())
            .do(data => console.log('Unitário: ' + JSON.stringify(data)))
            .catch(this.handleError);
  }
  
  private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}