import { Component, OnInit, Input } from '@angular/core';
import {Ingrediente} from '../ingrediente/ingrediente';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ingrediente-detail',
  templateUrl: './ingrediente-detail.component.html',
  styleUrls: ['./ingrediente-detail.component.css']
})
export class IngredienteDetailComponent implements OnInit {
  @Input() ingrediente: Ingrediente;
 
  constructor(
  private route: ActivatedRoute,
    private ingredienteService: IngredienteService,
    private location: Location) 
  { }
 
  ngOnInit() {
    this.getIngrediente();
  }
  
  getIngrediente(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ingredienteService.getIngrediente(id)
      .subscribe(ingrediente => this.ingrediente = ingrediente);
  }
 
  goBack(): void {
    this.location.back();
  }
 
}