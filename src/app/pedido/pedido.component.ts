import { Component, OnInit, Input, ElementRef,  ViewChild, AfterViewInit } from '@angular/core';
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
 @ViewChild('input1') inputEl:ElementRef;

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
	renderDivIngrediente: boolean;

 constructor(
		  private messageService: MessageService,
		  private opcaoService: OpcaoCardapioService, 
		  private ingredienteService: IngredienteService, 
		  private opcaoIngredienteService: OpcaoIngredienteService){

		  this.formulario.controls['idOpcaoCardapio'].setValue(0, {onlySelf: true});
		  this.formulario.controls['idIngrediente'].setValue(0, {onlySelf: true});
		  this.renderDivIngrediente = false;
	}

  ngOnInit() {
	 this.getOpcoesCardapio();
	 this.getIngredientes();
  }

  mostrarFocus() {
	if(this.formulario.value.idOpcaoCardapio == 0 || this.formulario.value.idOpcaoCardapio == 5)
	   this.renderDivIngrediente = false;
	this.inputEl.nativeElement.focus();
  }

  visualizarIngrediente(){
	if(this.formulario.value.idOpcaoCardapio != 0 && this.formulario.value.idOpcaoCardapio != 5){
		this.renderDivIngrediente = true;
		this.carregarListaIngredientes();
	}
  }
  
  onSubmit(){
	  this.messageService.add(1,'Lanche adicionado!'+this.listaIngredientes);
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
	this.messageService.add(3,'O Ingrediente '+obj.ingrediente.descricao.toUpperCase()+' teve sua quantidade atualizada.');
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
	  this.messageService.add(3,'O Ingrediente '+obj.ingrediente.descricao.toUpperCase()+' teve sua quantidade atualizada.');
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

 addIngredienteExtra(){
	var idOpcao = this.formulario.value.idOpcaoCardapio;
	var idIngrediente = this.formulario.value.idIngrediente;
	var existeElemento = false;
	if(idOpcao  != 5){
		this.listaOpcaoIngredientes.forEach(element => {
			if(element.ingrediente.id == idIngrediente){
			   this.aumentarQuantidade(element);
			   existeElemento = true;
			   console.log(element);
			}	
		});
	}
	if(!existeElemento){
		var obj = {
			id:0, 
			opcaoCardapio:{},
			ingrediente:{},
			quantidade:1, 
			valorDesconto:0, 
			valorTotal:0};
		obj.ingrediente = this.opcoesIngredientes.find(x => x.id == idIngrediente);
		obj.opcaoCardapio = this.opcoes.find(x =>  x.id = idOpcao);
		obj.valorTotal = (<OpcaoIngrediente>obj).ingrediente.valor;

		this.listaOpcaoIngredientes.push(<OpcaoIngrediente> obj);
	}
	this.calcularDesconto(<OpcaoIngrediente>obj);
	this.messageService.add(1,"O Ingrediente "+(<OpcaoIngrediente>obj)
	.ingrediente.descricao.toUpperCase()+" foi adicionado ao seu lanche.");
  }

  removerIngredienteExtra(obj:OpcaoIngrediente){
	  var objetoRemover = this.listaOpcaoIngredientes.find(x => x.ingrediente == obj.ingrediente);
	  var index = this.listaOpcaoIngredientes.indexOf(objetoRemover);
	  this.listaOpcaoIngredientes.splice(index);
	  console.log(obj);
  }

  adicionarLanche(){
	  this.messageService.add(1,'Adicionar Lanche!');
  }
  
  chamarServicoListaIngrediente(){
	this.valorTotalLanche = 0.0;
	if(this.formulario.value.idOpcaoCardapio == null)
		this.opcaoIngredienteService.getOpcaoIngredienteByIdOpcaoCardapio(0);
	else
		this.opcaoIngredienteService.getOpcaoIngredienteByIdOpcaoCardapio(this.formulario.value.idOpcaoCardapio);
  }
  carregarListaIngredientes(){
	this.chamarServicoListaIngrediente();
	this.listaOpcaoIngredientes = this.opcaoIngredienteService.listaOpcoesIngredientes;
  }

  getOpcoesCardapio(): void {
	    this.opcaoService.getListaOpcoesCardapio().subscribe(opcoes => this.opcoes = opcoes);
	}
	
  getIngredientes(): void {
	    this.ingredienteService.getListaIngredientes()
	        .subscribe(opcoesIngredientes => this.opcoesIngredientes = opcoesIngredientes);
  }
}
