import { Component, OnInit} from '@angular/core';
import {Ingrediente} from './Ingrediente';
import { IngredienteService } from './ingrediente.service';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})

export class IngredienteComponent implements OnInit {
  ingredientes : Ingrediente[];
  objSelecionado: Ingrediente;
  
  constructor(private ingredienteService: IngredienteService){ }
  
  ngOnInit(){
    this.getIngredientes();
  }
  
  onSelect(obj: Ingrediente): void {
    this.objSelecionado = obj;
  }
  
  getIngredientes(): void {
    this.ingredienteService.getListaIngredientes()
        .subscribe(ingredientes => this.ingredientes = ingredientes);
  }
}