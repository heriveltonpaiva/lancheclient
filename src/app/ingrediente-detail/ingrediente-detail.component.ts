import { Component, OnInit, Input } from '@angular/core';
import {Ingrediente} from '../ingrediente/ingrediente';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OpcaoIngrediente } from '../opcao-ingrediente/opcao-ingrediente';
import { OpcaoIngredienteService } from '../opcao-ingrediente/opcao-ingrediente.service';
import { FormsModule } from '@angular/forms';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-ingrediente-detail',
  templateUrl: './ingrediente-detail.component.html',
  styleUrls: ['./ingrediente-detail.component.css']
})
export class IngredienteDetailComponent implements OnInit {
  @Input() ingrediente: Ingrediente;
 
  ingredientes: Ingrediente[];
  constructor(
  private route: ActivatedRoute,
    private ingredienteService: IngredienteService,
    private location: Location,
    private mensagemService: MessageService) 
  { }
 
  ngOnInit() {
    this.getIngrediente();
  }
  
  alterar(){
      this.ingredienteService.update(this.ingrediente)
      .subscribe(() => this.goBack());
      console.log(this.ingrediente);
      this.mensagemService.add(1, 'Registro atualizado com sucesso.');
  }

  getIngrediente(): void {
    const id = +this.route.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.location.back();
  }
 
}