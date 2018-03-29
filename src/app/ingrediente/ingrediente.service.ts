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
    this.messageService.add('HeroService: fetched heroes');
    return of(INGREDIENTES);
}
}