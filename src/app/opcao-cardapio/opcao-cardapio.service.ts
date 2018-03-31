import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { OpcaoCardapio } from './opcaocardapio';
import { MessageService } from '../messages/message.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

 
@Injectable()
export class OpcaoCardapioService {
  private url = 'http://127.0.0.1:8080/opcoesCardapio';
  constructor(
    private http: Http,
    private messageService: MessageService){
  }
  getListaOpcoesCardapio(): Observable<OpcaoCardapio[]> {
    return this.http.get(this.url)
    .map((response: Response) => <OpcaoCardapio>response.json())
            .catch(this.handleError);
  }
  getOpcoesCardapio(id:number){
     const url = `${this.url}/${id}`;
     return this.http.get(this.url)
    .map((response: Response) => <OpcaoCardapio>response.json())
            .catch(this.handleError);
  }
  
  private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}