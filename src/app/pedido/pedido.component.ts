import { Component, OnInit, Input } from '@angular/core';
import { OpcaoCardapio } from '../opcao-cardapio/opcaocardapio';
import { OpcaoCardapioService } from '../opcao-cardapio/opcao-cardapio.service';
import {Ingrediente} from '../ingrediente/Ingrediente';
import {OpcaoIngrediente} from '../opcao-ingrediente/opcao-ingrediente';

import { IngredienteService } from '../ingrediente/ingrediente.service';
import { OpcaoIngredienteService } from '../opcao-ingrediente/opcao-ingrediente.service';
import { Pedido } from './pedido';
import {FormControl, FormGroup} from '@angular/forms';
import { MessageService } from '../messages/message.service';
import { forEach } from '@angular/router/src/utils/collection';

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
 
	listaOpcaoIngredientes: OpcaoIngrediente[];
	novaOpcaoIngrediente: OpcaoIngrediente;
	ingrediente: Ingrediente;
	valorTotalLanche : number;

 constructor(
		  private messageService: MessageService,
		  private opcaoService: OpcaoCardapioService, 
		  private ingredienteService: IngredienteService, 
		  private opcaoIngredienteService: OpcaoIngredienteService){
	}

  ngOnInit() {
	 this.getOpcoesCardapio();
	 this.getIngredientes();
	 this.valorTotalLanche = 0.0;
  }
  
  onSubmit(){
	  this.messageService.add('Lanche adicionado!'+this.listaIngredientes);
	  console.log(this.formulario.value)
	  console.log("Lista de Lanches:"+ this.ingredienteService.getIngrediente(1));
  }
  
  aumentarQuantidade(obj:OpcaoIngrediente){
	this.listaOpcaoIngredientes.forEach(element => {
		if(obj.id == element.id){
			element.quantidade ++;
			element.valorTotal = element.valorTotal + element.ingrediente.valor;
			this.calcularDesconto(element);
			this.valorTotalLanche = this.valorTotalLanche + element.ingrediente.valor;
		}
	});
  }
  diminuirQuantidade(obj:OpcaoIngrediente){
	  this.listaOpcaoIngredientes.forEach(element => {
		  if(obj.id == element.id){
			  element.quantidade --;
			  element.valorTotal = element.valorTotal - element.ingrediente.valor;
			  this.calcularDesconto(element);
			  this.valorTotalLanche = this.valorTotalLanche - element.ingrediente.valor;
		  }
	  });
  }
  
  calcularDesconto(obj:OpcaoIngrediente){
	if(obj.quantidade > 2){
	var fator = obj.quantidade % 3;
	var desconto = obj.ingrediente.valor - (fator * 2)
	obj.valorDesconto = desconto;
	obj.valorTotal = (obj.ingrediente.valor * obj.quantidade) - desconto;
	}else{
		obj.valorTotal + obj.valorDesconto;
		obj.valorDesconto = 0;
	}
 };

  addIngredienteOpcaoCustom(){
	this.opcoes.forEach(element => {
		if(element.id == this.formulario.value.idOpcaoCardapio)
			this.novaOpcaoIngrediente.opcaoCardapio = element;
	});
	this.opcoesIngredientes.forEach(element => {
		if(element.id == this.formulario.value.idIngrediente)
		 this.novaOpcaoIngrediente.ingrediente = element;
	});
	
    this.novaOpcaoIngrediente.quantidade = 1;
	this.listaOpcaoIngredientes.push(this.novaOpcaoIngrediente);
	this.messageService.add("Ingrediente adicionado ao seu lanche.");
  }

  adicionarLanche(){
	  this.messageService.add('Adicionar Lanche!');
  }
  
  carregarListaIngredientes(){
	this.valorTotalLanche = 0.0;
	this.opcaoIngredienteService.getOpcaoIngredienteByIdOpcaoCardapio(this.formulario.value.idOpcaoCardapio);
	this.listaOpcaoIngredientes = this.opcaoIngredienteService.listaOpcoesIngredientes;
	this.listaOpcaoIngredientes.forEach(element => {
	  this.valorTotalLanche = this.valorTotalLanche + element.valorTotal;
	});
	
  }
  getOpcoesCardapio(): void {
	    this.opcaoService.getListaOpcoesCardapio().subscribe(opcoes => this.opcoes = opcoes);
	}
	
  getIngredientes(): void {
	    this.ingredienteService.getListaIngredientes()
	        .subscribe(opcoesIngredientes => this.opcoesIngredientes = opcoesIngredientes);
  }
}
