import { Ingrediente } from '../ingrediente/ingrediente';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ingredientes: Ingrediente[] = [];
 
  constructor(private ingredienteService: IngredienteService) { }
 
  ngOnInit() {
    this.getIngredientes();
  }
 
  getIngredientes(): void {
    this.ingredienteService.getListaIngredientes()
      .subscribe(ingredientes => this.ingredientes = ingredientes.slice(1, 5));
  }
}