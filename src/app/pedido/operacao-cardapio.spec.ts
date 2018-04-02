import { TestBed, inject } from "@angular/core/testing";
import { HttpModule, ResponseOptions } from "@angular/http";
import { IngredienteService } from "../ingrediente/ingrediente.service";
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "../messages/message.service";
import { Ingrediente } from "../ingrediente/ingrediente";
import { PromocaoCardapioHelper } from "./promocao-helper";
import { OperacaoCardapioHelper } from "./operacao-cardapio";
import { OpcaoCardapio } from "../opcao-cardapio/opcaocardapio";
import { OpcaoIngrediente } from "../opcao-ingrediente/opcao-ingrediente";
import { INGREDIENTES } from "../ingrediente/mock-ingrediente";
import { OPCOES_CARDAPIO } from "../opcao-cardapio/mock-opcao-cardapio";

var opcoesBacon:OpcaoIngrediente[];
var opcoesXburguer:OpcaoIngrediente[];
var opcoesXEgg:OpcaoIngrediente[];
var opcoesXEggBacon:OpcaoIngrediente[];
var opcoesCustom:OpcaoIngrediente[];

describe('Lanche Bem', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule, HttpClientModule],
        providers: [IngredienteService, HttpClientModule, MessageService]
      });

    }); 

    describe('ADICIONANDO E REMOVENDO INGREDIENTES', () => {
        opcoesXburguer =
        [{"id":4,"opcaoCardapio":{"id":2,"descricao":"X-Burger","valor":0.0,"valorOriginal":0.0,"ingredientes":[],'quantidade': 0, 'valorDesconto': 0, 'valorTotal': 0},"ingrediente":{"id":3,"descricao":"Hambúrguer","valor":3.0},"quantidade":1,"valorDesconto":0.0,"valorTotal":3.0},
        {"id":5,"opcaoCardapio":{"id":2,"descricao":"X-Burger","valor":0.0,"valorOriginal":0.0,"ingredientes":[],'quantidade': 0, 'valorDesconto': 0, 'valorTotal': 0},"ingrediente":{"id":5,"descricao":"Queijo","valor":1.5},"quantidade":1,"valorDesconto":0.0,"valorTotal":1.5}]
        var operacao = new OperacaoCardapioHelper();
        var promocao = new  PromocaoCardapioHelper();
        var valorTotalLanche = 0.0;

        it('adicionando ALFACE', () => {
            operacao.addIngredienteExtra(1,1,0, INGREDIENTES,OPCOES_CARDAPIO, opcoesXburguer, promocao, false);
            expect(opcoesXburguer.forEach.length).toEqual(1);
        })
        it('acrescimo de quantidade ', () => {
            promocao.aumentarQuantidade(opcoesXburguer[0], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer[0].quantidade).toEqual(2);
        })
        /**
        it('acrescimo de quantidade do OVO ', () => {
            promocao.aumentarQuantidade(opcoesXburguer[0], valorTotalLanche, opcoesXburguer);
            promocao.aumentarQuantidade(opcoesXburguer[0], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer[4].quantidade).toEqual(3);
        }) */
        it('adicionando BACON ', () => {});

        it('adicionando opcao CUSTOMIZADO ', () => {});

        it('validando valor total do lanche  ', () => {
            expect(opcoesXburguer[0].valorTotal).toEqual(opcoesXburguer[0].ingrediente.valor * opcoesXburguer[0].quantidade);
        })

        it('Testando o serviço', 
        inject([IngredienteService], (ingredienteService) => {
          expect(ingredienteService.getValor()).toEqual(1);
      }))});    
  });