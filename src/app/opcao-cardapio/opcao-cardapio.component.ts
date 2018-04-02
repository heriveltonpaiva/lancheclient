import { Component, OnInit } from '@angular/core';
import { OpcaoCardapio } from './opcaocardapio';
import { OpcaoCardapioService } from './opcao-cardapio.service';

@Component({
  selector: 'app-opcao-cardapio',
  templateUrl: './opcao-cardapio.component.html'
})
export class OpcaoCardapioComponent implements OnInit {

	  opcoes : OpcaoCardapio[];
	  objSelecionado: OpcaoCardapio;
	  
	  constructor(private opcaoService: OpcaoCardapioService){ }
	  
	  ngOnInit(){
	    this.getOpcoesCardapio();
	  }
	  
	  onSelect(obj: OpcaoCardapio): void {
	    this.objSelecionado = obj;
	  }
	  
	  getOpcoesCardapio(): void {
	    this.opcaoService.getListaOpcoesCardapio()
	        .subscribe(opcoes => this.opcoes = opcoes);
	  }
}
