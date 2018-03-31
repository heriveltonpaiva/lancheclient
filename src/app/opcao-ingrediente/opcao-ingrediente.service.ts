import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { OpcaoIngrediente } from './opcao-ingrediente';
import { MessageService } from '../messages/message.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

 
@Injectable()
export class OpcaoIngredienteService {
  private url = 'http://127.0.0.1:8080/opcaoIngrediente';
  listaOpcoesIngredientes: OpcaoIngrediente[];
  constructor(
    private http: Http,
    private messageService: MessageService){
  }
  /**
   * Retorna a opcao do ingrediente de acordo com o ID
   */
  getOpcaoIngredienteById(id:number){
     const url = `${this.url}/${id}`;
     console.log('URL:'+url);
     return this.http.get(this.url)
    .map((response: Response) => <OpcaoIngrediente>response.json())
            .do(data => console.log('Retorno: ' + JSON.stringify(data)));
  }
  
  /**
   * Retorna os ingredientes de um lanche do cardápio
   */
    
    getOpcaoIngredienteByIdOpcaoCardapio(id:number){
      const url = `http://127.0.0.1:8080/opcaoIngrediente/opcaoCardapio/`;

     // let promise = new Promise((resolve, reject) => {
        let apiURL = `${url}${id}`;
        return this.http.get(apiURL).map((response) => JSON.stringify(response.json()))
        .toPromise().then((result) => {
          this.listaOpcoesIngredientes = <OpcaoIngrediente[]> JSON.parse(result);
          console.log("Lista de Ingredientes: "+this.listaOpcoesIngredientes); 
        })
      };
  
}