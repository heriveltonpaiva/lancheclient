import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Ingrediente } from './ingrediente';
import { INGREDIENTES } from './mock-ingrediente';
import { MessageService } from '../messages/message.service';

@Injectable()
export class IngredienteService {
  constructor(private messageService: MessageService){
  
  }
  
  getListaIngredientes(): Observable<Ingrediente[]> {
    this.messageService.add('Chamando Listagem de Ingredientes');
    return of(INGREDIENTES);
}
  
  getIngrediente(id: number): Observable<Ingrediente> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`Consultando Ingrediente : id=${id}`);
    return of(INGREDIENTES.find(ingrediente => ingrediente.id === id));
  }
  
}