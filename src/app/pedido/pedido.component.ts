import { Component, OnInit, Input } from '@angular/core';
import { OpcaoCardapio } from '../opcao-cardapio/opcaocardapio';
import { OpcaoCardapioService } from '../opcao-cardapio/opcao-cardapio.service';
import {Ingrediente} from '../ingrediente/Ingrediente';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { Pedido } from './pedido';
import {FormControl, FormGroup} from '@angular/forms';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  
 formulario = new FormGroup({
	 idIngrediente: new FormControl(),
	 idOpcaoCardapio: new FormControl()
 });	
    //comboBox de Opções
	opcoes : OpcaoCardapio[];
 	//comboBox de Ingredientes Extras
    opcoesIngredientes: Ingrediente[];
   //Lista de Ingredientes da Opção
    listaIngredientes: Ingrediente[];
    
	constructor(
		  private messageService: MessageService,
		  private opcaoService: OpcaoCardapioService, 
		  private ingredienteService: IngredienteService){
	}

  ngOnInit() {
	 this.getOpcoesCardapio();
	 this.getIngredientes();
  }
  
  onSubmit(){
	  console.log(this.formulario.value)
  }
  
  carregarListaIngredientes(){
	  this.messageService.add('Carregando Lista...!'+this.formulario.value.idOpcaoCardapio);
	  if(this.formulario.value.idOpcaoCardapio == 5)
		  this.formulario.value.idIngrediente = 0;
	  this.ingredienteService.getListaIngredientes()
      .subscribe(listaIngredientes => this.listaIngredientes = listaIngredientes);
  }
  
  adicionarLanche(){
	  this.messageService.add('Adicionar Lanche!');
  }
  
  getOpcoesCardapio(): void {
	    this.opcaoService.getListaOpcoesCardapio()
	       .subscribe(opcoes => this.opcoes = opcoes);
	}
	
  getIngredientes(): void {
	    this.ingredienteService.getListaIngredientes()
	        .subscribe(opcoesIngredientes => this.opcoesIngredientes = opcoesIngredientes);
	  }
}
