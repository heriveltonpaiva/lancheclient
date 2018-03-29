import { Component, OnInit, Input } from '@angular/core';
import {Ingrediente} from '../ingrediente/Ingrediente';

@Component({
  selector: 'app-ingrediente-detail',
  templateUrl: './ingrediente-detail.component.html',
  styleUrls: ['./ingrediente-detail.component.css']
})
export class IngredienteDetailComponent implements OnInit {
  @Input() ingrediente: Ingrediente;
 
  constructor() { }
 
  ngOnInit() {
  }
 
}