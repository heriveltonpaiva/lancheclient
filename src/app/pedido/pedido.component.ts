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
	fluxoOpcaoCustom: boolean;
	promocaoLight:boolean;
 constructor(
		  private messageService: MessageService,
		  private opcaoService: OpcaoCardapioService, 
		  private ingredienteService: IngredienteService, 
		  private opcaoIngredienteService: OpcaoIngredienteService){

		  this.formulario.controls['idOpcaoCardapio'].setValue(0, {onlySelf: true});
		  this.formulario.controls['idIngrediente'].setValue(0, {onlySelf: true});
		  this.renderDivIngrediente = false;
		  this.fluxoOpcaoCustom = false;
		  this.promocaoLight = false;
		  this.valorTotalLanche = 0;
	}

  ngOnInit() {
	 this.getOpcoesCardapio();
	 this.getIngredientes();
  }

  mostrarFocus() {
	if(this.formulario.value.idOpcaoCardapio == 5){
		this.fluxoOpcaoCustom = true;
		this.listaOpcaoIngredientes = []; 
	}
	else
		this.fluxoOpcaoCustom = false;
	if(this.formulario.value.idOpcaoCardapio == 0 || this.fluxoOpcaoCustom)
	   this.renderDivIngrediente = false;
	if(!this.fluxoOpcaoCustom)
	   this.inputEl.nativeElement.focus();
	
  }

  visualizarIngrediente(){
	if(this.formulario.value.idOpcaoCardapio != 0 && this.formulario.value.idOpcaoCardapio != 5){
		this.renderDivIngrediente = true;
		this.carregarListaIngredientes();
		//calcula o valor total do lanche ao clicar em visualizar
		this.listaOpcaoIngredientes.forEach(item => {
			this.valorTotalLanche += item.valorTotal;
		});
	}
  }
  calcularPromocaoLight():boolean{
	  var alface = this.listaOpcaoIngredientes.find(x => x.ingrediente.id == 1);
	  var bacon = this.listaOpcaoIngredientes.find(x => x.ingrediente.id == 2);
	  this.promocaoLight = !bacon;
	  if(this.promocaoLight && (alface != null || alface != undefined)){
		     //verifica se o alface é o primeiro ingrediente adicionado no pedido customizado
			if(this.valorTotalLanche > 0)
		   		this.valorTotalLanche = this.valorTotalLanche - (this.valorTotalLanche * 0.10);
		   else
				this.valorTotalLanche = alface.ingrediente.valor;
				   
		   console.log("Promoção LIGHT!:"+this.valorTotalLanche);
		   this.promocaoLight = true;
		return true;
	  }
	return false;
  }
  aumentarQuantidade(obj:OpcaoIngrediente){
	this.valorTotalLanche = 0;
	this.listaOpcaoIngredientes.forEach(element => {
		if(obj.ingrediente.id == element.ingrediente.id){
			element.quantidade ++;
			if(obj.ingrediente.id == 3 || obj.ingrediente.id == 5){ 
				this.calcularDesconto(element);
			}else{
				element.valorTotal = element.valorTotal + element.ingrediente.valor;
			}
		}
		this.valorTotalLanche += element.valorTotal;
	});
	this.calcularPromocaoLight();
  }

  diminuirQuantidade(obj:OpcaoIngrediente){
	  if(obj.quantidade == 1 && obj.id == 0)
	  	this.removerIngredienteExtra(obj);
	  this.valorTotalLanche = 0;
	  this.listaOpcaoIngredientes.forEach(element => {
		  if(obj.id == element.id){
			  element.quantidade --;
			 if(obj.ingrediente.id == 3 || obj.ingrediente.id == 5){ 
				 this.calcularDesconto(element);
			 }else{
				element.valorTotal = element.valorTotal - element.ingrediente.valor;;
			 }
		  }
		  this.valorTotalLanche += element.valorTotal;
	  });
	  this.calcularPromocaoLight();
  }
  
  calcularDesconto(obj:OpcaoIngrediente){
	if(obj.quantidade > 2 && obj.quantidade % 3 == 0){
		//calcula quantos itens é para pagar 
		var qntItemPagar = (obj.quantidade/3)  * 2;
		// calcula o valor de todos os itens e calcula o valor que será realmente pago
		var valorSemDesconto = obj.quantidade * obj.ingrediente.valor ;
		var valorComDesconto = qntItemPagar * obj.ingrediente.valor;
		var desconto = valorSemDesconto  - valorComDesconto;
		console.log("Com Desconto:"+valorComDesconto+" Sem Desconto: "+valorSemDesconto+ " Desconto: "+desconto)
		obj.valorDesconto = desconto;
		obj.valorTotal = qntItemPagar * obj.ingrediente.valor;
	}else{
		obj.valorDesconto = Math.floor(obj.quantidade / 3) * obj.ingrediente.valor;
		//se o valor for menor que 3 da promoção carne e queijo, o valor desconto será 0
		obj.valorTotal = obj.quantidade * obj.ingrediente.valor - (obj.quantidade <= 2 ? 0:obj.valorDesconto);
		obj.valorTotal = (obj.quantidade * obj.ingrediente.valor) - obj.valorDesconto;
	}
 };

 addIngredienteExtra(){
	var idOpcao = this.formulario.value.idOpcaoCardapio;
	var idIngrediente = this.formulario.value.idIngrediente;
	//adicionar novo ingrediente
	if(!this.atualizarValorIngrediente(idIngrediente)){
		var obj = {id:0, opcaoCardapio:{},ingrediente:{},
			quantidade:1, valorDesconto:0, valorTotal:0};
	    //realiza a busca dos objetos opcaoCardapio e Ingrediente
		obj.ingrediente = this.opcoesIngredientes.find(x => x.id == idIngrediente);
		if(idOpcao != 5)
			obj.opcaoCardapio = this.opcoes.find(x =>  x.id = idOpcao);
		//adiciona o elemento novo na listagem
		this.listaOpcaoIngredientes.push(<OpcaoIngrediente> obj);
		this.renderDivIngrediente = true;
	this.messageService.add(1,"O Ingrediente "+(<OpcaoIngrediente>obj).ingrediente.descricao.toUpperCase()+" foi adicionado ao seu lanche.");
	}
	this.calcularDesconto(obj instanceof OpcaoIngrediente ? obj:<OpcaoIngrediente>obj)
	this.calcularPromocaoLight();
  }

  atualizarValorIngrediente(idIngrediente:number):boolean{
	var encontrou = false;
	this.listaOpcaoIngredientes.forEach(element => {
		console.log(idIngrediente +""+element.ingrediente.id);
	if(element.ingrediente.id == idIngrediente){
	  		this.aumentarQuantidade(element);
			encontrou = true;
		}	
	}	
	);
	return encontrou;
  }

  removerIngredienteExtra(obj:OpcaoIngrediente){
	  if(obj.quantidade == 1)
	  	this.valorTotalLanche -= obj.valorTotal;
	  var objetoRemover = this.listaOpcaoIngredientes.find(x => x.ingrediente == obj.ingrediente);
	  var index = this.listaOpcaoIngredientes.indexOf(objetoRemover);
	  this.listaOpcaoIngredientes.splice(index);
	  
  }

  onSubmit(){
	this.messageService.add(1,'Lanche adicionado!'+this.listaIngredientes);
	console.log(this.formulario.value)
	console.log("Lista de Lanches:"+ this.ingredienteService.getIngrediente(1));
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
