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

    describe('X-BURGUER OPERAÇÕES:', () => {
        opcoesXburguer =
        [{"id":4,"opcaoCardapio":{"id":2,"descricao":"X-Burger","valor":0.0,"valorOriginal":0.0,"ingredientes":[],'quantidade': 0, 'valorDesconto': 0, 'valorTotal': 0},"ingrediente":{"id":3,"descricao":"Hambúrguer","valor":3.0},"quantidade":1,"valorDesconto":0.0,"valorTotal":3.0},
        {"id":5,"opcaoCardapio":{"id":2,"descricao":"X-Burger","valor":0.0,"valorOriginal":0.0,"ingredientes":[],'quantidade': 0, 'valorDesconto': 0, 'valorTotal': 0},"ingrediente":{"id":5,"descricao":"Queijo","valor":1.5},"quantidade":1,"valorDesconto":0.0,"valorTotal":1.5}]
        var operacao = new OperacaoCardapioHelper();
        var promocao = new  PromocaoCardapioHelper();
        var valorTotalLanche = 0.0;
        
        it('T1 - adicionar BACON ao Xburguer', () => {
            operacao.addIngredienteExtra(2,2,0, INGREDIENTES,OPCOES_CARDAPIO, opcoesXburguer, promocao, false);
            expect(opcoesXburguer.forEach.length).toEqual(1);
        });
        it('T2 - Validar quantidade após inserção ', () => {
            expect(opcoesXburguer.length).toEqual(3);
        });
        it('T3 - Acrescimo de quantidade X3 ', () => {
            valorTotalLanche = promocao.aumentarQuantidade(opcoesXburguer[2], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer[2].quantidade).toEqual(2);
            valorTotalLanche = promocao.aumentarQuantidade(opcoesXburguer[2], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer[2].quantidade).toEqual(3);
            valorTotalLanche = promocao.aumentarQuantidade(opcoesXburguer[2], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer[2].quantidade).toEqual(4);
        })
       
        it('T4 - validar valor do Item 1 HAMBURGUER', () => {
            expect(opcoesXburguer[0].valorTotal).toEqual(opcoesXburguer[0].quantidade * opcoesXburguer[0].ingrediente.valor);
        });

        it('T5 - validar valor do Item 2 QUEIJO ', () => {
            expect(opcoesXburguer[1].valorTotal).toEqual(opcoesXburguer[1].quantidade * opcoesXburguer[1].ingrediente.valor);
        });

        it('T6 - validar valor do Item 3 BACON ', () => {
            expect(opcoesXburguer[2].valorTotal).toEqual(valorTotalLanche - (opcoesXburguer[0].valorTotal + opcoesXburguer[1].valorTotal));
        });

        it('T7 - Acréscimo Item QUEIJO ', () => {
            valorTotalLanche = promocao.aumentarQuantidade(opcoesXburguer[1], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer[1].valorTotal).toEqual(opcoesXburguer[1].quantidade * opcoesXburguer[1].ingrediente.valor);
            expect(opcoesXburguer[1].quantidade).toEqual(2);
        });

        it('T8 - Decréscimo Item QUEIJO ', () => {
            valorTotalLanche = promocao.diminuirQuantidade(opcoesXburguer[1], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer[1].valorTotal).toEqual(opcoesXburguer[1].quantidade * opcoesXburguer[1].ingrediente.valor);
            expect(opcoesXburguer[1].quantidade).toEqual(1);
        });

        it('T9 - validando valor total do CARNE, QUEIJO, BACON  ', () => {
            expect(opcoesXburguer[0].valorTotal+opcoesXburguer[1].valorTotal+opcoesXburguer[2].valorTotal).toEqual(valorTotalLanche);
        })

        it('T10 - Adicionar o Item ALFACE e Aumentado sua quantidade x3  ', () => {
            operacao.addIngredienteExtra(2,1,0, INGREDIENTES,OPCOES_CARDAPIO, opcoesXburguer, promocao, false);
            expect(opcoesXburguer[3].valorTotal).toEqual(0.40);
            valorTotalLanche = promocao.aumentarQuantidade(opcoesXburguer[3], valorTotalLanche, opcoesXburguer);
            valorTotalLanche = promocao.aumentarQuantidade(opcoesXburguer[3], valorTotalLanche, opcoesXburguer);
            valorTotalLanche = promocao.aumentarQuantidade(opcoesXburguer[3], valorTotalLanche, opcoesXburguer);
            expect(Math.round((opcoesXburguer[3].valorTotal) * 100) / 100).toEqual(opcoesXburguer[3].quantidade * opcoesXburguer[3].ingrediente.valor);
        });

        it('T11 - validando valor total do CARNE, QUEIJO, BACON e ALFACE  ', () => {
            var valorCarne = opcoesXburguer[0].valorTotal;
            var valorQueijo = opcoesXburguer[1].valorTotal;
            var valorBacon = opcoesXburguer[2].valorTotal;
            expect(opcoesXburguer[3].valorTotal+valorCarne+valorQueijo+valorBacon).toEqual(valorTotalLanche);
        })
        it('T12 - Validando Remoção do BACON ', () => {
            valorTotalLanche = operacao.removerIngrediente(opcoesXburguer[2], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer.length).toEqual(3);
        });
        it('T13 - (PromocaoLIGHT) Validando Valor Total com Desconto do ALFACE  ', () => {
            var valorCarne = opcoesXburguer[0].valorTotal;
            var valorQueijo = opcoesXburguer[1].valorTotal;
            var valorAlface = opcoesXburguer[2].valorTotal;
            var totalDesconto = (valorAlface+valorQueijo+valorCarne) * 0.10;
            expect(Math.round((valorAlface+valorQueijo+valorCarne-totalDesconto)* 100) / 100)
            .toEqual(Math.round((valorTotalLanche) * 100) / 100);
        });

        it('T14 - (PromocaoLIGHT) Removendo ALFACE para Validar promocao ', () => {
            valorTotalLanche = operacao.removerIngrediente(opcoesXburguer[2], valorTotalLanche, opcoesXburguer);
            expect(opcoesXburguer.length).toEqual(2);
        });

        it('T15 - validando valor total do CARNE, QUEIJO (SEM ALFACE SEM BACON) ', () => {
            var valorCarne = opcoesXburguer[0].valorTotal;
            var valorQueijo = opcoesXburguer[1].valorTotal;
            expect(valorCarne+valorQueijo).toEqual(valorTotalLanche);
        })
     });    
  });