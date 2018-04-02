import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { OpcaoCardapio } from '../opcao-cardapio/opcaocardapio';
import { OpcaoCardapioService } from '../opcao-cardapio/opcao-cardapio.service';
import { Ingrediente } from '../ingrediente/Ingrediente';
import { OpcaoIngrediente } from '../opcao-ingrediente/opcao-ingrediente';

import { IngredienteService } from '../ingrediente/ingrediente.service';
import { OpcaoIngredienteService } from '../opcao-ingrediente/opcao-ingrediente.service';
import { Pedido } from './pedido';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../messages/message.service';
import { forEach } from '@angular/router/src/utils/collection';
import { PromocaoCardapioHelper } from './promocao-helper';
import { OperacaoCardapioHelper } from './operacao-cardapio';

@Component({
	selector: 'app-pedido',
	templateUrl: './pedido.component.html'
})
/**
 * Classe Reponsável pelas ações 
 * da tela de criação do lanche
 * @author Herivelton Paiva
 */
export class PedidoComponent implements OnInit {
	@ViewChild('input1') inputEl: ElementRef;
	formulario = new FormGroup({
		idIngrediente: new FormControl([Validators.required]),
		idOpcaoCardapio: new FormControl()
	});
	//comboBox de Opções
	opcoes: OpcaoCardapio[];
	//comboBox de Ingredientes Extras
	opcoesIngredientes: Ingrediente[];
	//Lista de Ingredientes da Opção
	listaIngredientes: Ingrediente[];
	listaOpcaoIngredientes: OpcaoIngrediente[];
	novaOpcaoIngrediente: OpcaoIngrediente;
	ingrediente: Ingrediente;
	valorTotalLanche: number;
	renderDivIngrediente: boolean;
	fluxoOpcaoCustom: boolean;
	promocaoLight: boolean;
	operacaoCardapio: OperacaoCardapioHelper;

	constructor(
		private messageService: MessageService,
		private opcaoService: OpcaoCardapioService,
		private ingredienteService: IngredienteService,
		private opcaoIngredienteService: OpcaoIngredienteService) {

		this.formulario.controls['idOpcaoCardapio'].setValue(0, { onlySelf: true });
		this.formulario.controls['idIngrediente'].setValue(0, { onlySelf: true });
		this.renderDivIngrediente = false;
		this.fluxoOpcaoCustom = false;
		this.promocaoLight = false;
		this.valorTotalLanche = 0;
	}

	ngOnInit() {
		this.getOpcoesCardapio();
		this.getIngredientes();
	}

	/** Ação do botão visualizar ingrediente  */
	visualizarIngrediente() {
		if (this.formulario.value.idOpcaoCardapio != 0 && this.formulario.value.idOpcaoCardapio != 5) {
			this.renderDivIngrediente = true;
			this.carregarListaIngredientes();
			//calcula o valor total do lanche ao clicar em visualizar
			this.listaOpcaoIngredientes.forEach(item => {
				this.valorTotalLanche += item.valorTotal;
			});
		}else{
			this.messageService.add(2,'Opção do Cardápio: Campo Obrigatório não informado!');
		}
	}
	/** Aumenta a quantidade após clicar no - da listagem */
	aumentarQuantidade(obj: OpcaoIngrediente) {
		var promocaoCardapio = new PromocaoCardapioHelper();
		this.valorTotalLanche = promocaoCardapio.aumentarQuantidade(obj, this.valorTotalLanche, this.listaOpcaoIngredientes);
	}
	/** Diminui q auntidade após clicar no + da listagem */
	diminuirQuantidade(obj: OpcaoIngrediente) {
		var promocaoCardapio = new PromocaoCardapioHelper();
		this.valorTotalLanche = promocaoCardapio.diminuirQuantidade(obj, this.valorTotalLanche, this.listaOpcaoIngredientes);
	}

	/** Adiciona um ingrediente extra na listagem do pedido */
	addIngredienteExtra() {
		
		var idOpcao = this.formulario.value.idOpcaoCardapio;
		var idIngrediente = this.formulario.value.idIngrediente;
		if(idOpcao == 0){
			this.messageService.add(2,'Opção do Cardápio: Campo Obrigatório não informado!');
		}else{
			if(idIngrediente == 0){
				this.messageService.add(2,'Ingrediente Extra: Campo Obrigatório não informado!');
			}else{
				var helper = new OperacaoCardapioHelper();
				var obj = helper.addIngredienteExtra(idOpcao, idIngrediente,
					this.valorTotalLanche,
					this.opcoesIngredientes,
					this.opcoes,
					this.listaOpcaoIngredientes, 
					new PromocaoCardapioHelper(),this.promocaoLight)
				this.valorTotalLanche = obj[1];
			}
		}
		if(idOpcao ==5)
			this.renderDivIngrediente = true;
	}

	/** Atualiza o valor do ingrediente */
	atualizarValorIngrediente(idIngrediente: number): boolean {
		var helper = new OperacaoCardapioHelper();
		return helper.atualizarValorIngrediente(idIngrediente, this.valorTotalLanche, this.listaOpcaoIngredientes, new PromocaoCardapioHelper());
	}

	/** Remove o ingrediente que foi adicionado como extra da listagem */
	removerIngredienteExtra(obj: OpcaoIngrediente) {
		var helper = new OperacaoCardapioHelper();
		this.valorTotalLanche = helper.removerIngrediente(obj, this.valorTotalLanche, this.listaOpcaoIngredientes);
	}

		/** Carrega a listagem de opções com os ingredientes */
	chamarServicoListaIngrediente() {
		this.valorTotalLanche = 0.0;
		if (this.formulario.value.idOpcaoCardapio == null)
			this.opcaoIngredienteService.getOpcaoIngredienteByIdOpcaoCardapio(0);
		else
			this.opcaoIngredienteService.getOpcaoIngredienteByIdOpcaoCardapio(this.formulario.value.idOpcaoCardapio);
	}

	/** Carrega a listagem de opções com os ingredientes */
	carregarListaIngredientes() {
		this.chamarServicoListaIngrediente();
		this.listaOpcaoIngredientes = this.opcaoIngredienteService.listaOpcoesIngredientes;
	}

	/** Carrega a listagem das opções do cardapio */
	getOpcoesCardapio(): void {
		this.opcaoService.getListaOpcoesCardapio().subscribe(opcoes => this.opcoes = opcoes);
	}

	/** Carrega a listagem com os ingredientes */
	getIngredientes(): void {
		this.ingredienteService.getListaIngredientes()
			.subscribe(opcoesIngredientes => this.opcoesIngredientes = opcoesIngredientes);
	}

  /** Muda o focus para o botão de visualizar que dependendo da opção altera o formulário */
	mostrarFocus() {
		if (this.formulario.value.idOpcaoCardapio == 5) {
			this.fluxoOpcaoCustom = true;
			this.listaOpcaoIngredientes = [];
		}
		else
			this.fluxoOpcaoCustom = false;
		if (this.formulario.value.idOpcaoCardapio == 0 || this.fluxoOpcaoCustom)
			this.renderDivIngrediente = false;
		if (!this.fluxoOpcaoCustom)
			this.inputEl.nativeElement.focus();

	}
}
