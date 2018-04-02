import {async} from "@angular/core/testing";
import { OperacaoCardapioHelper } from "./operacao-cardapio";
import { PromocaoCardapioHelper } from "./promocao-helper";
import { INGREDIENTES } from "../ingrediente/mock-ingrediente";
import { OPCOES_CARDAPIO } from "../opcao-cardapio/mock-opcao-cardapio";
import { OpcaoIngrediente } from "../opcao-ingrediente/opcao-ingrediente";

describe('X-CUSTOM OPERAÇÕES ', () => {
        var operacao = new OperacaoCardapioHelper();
        var promocao = new  PromocaoCardapioHelper();
        var lista: OpcaoIngrediente[];
        var valorTotalLanche = 0;
    it('T16 - adicionando o primeiro ingrediente', () => {
        var obj = operacao.addIngredienteExtra(0,2,0, INGREDIENTES,OPCOES_CARDAPIO, lista, new PromocaoCardapioHelper(), false);
        lista = obj[0];
        valorTotalLanche = obj[1];
        expect(lista.length).toEqual(1);    
    });

    it('T17 - adicionar o segundo ingrediente HAMBURGUER ', function() {
        var obj = operacao.addIngredienteExtra(5,3,0, INGREDIENTES,OPCOES_CARDAPIO, lista, new PromocaoCardapioHelper(), false);
        lista = obj[0];
        valorTotalLanche = obj[1];
        expect(lista.length).toEqual(2);
    })

    it('T18 - adicionar o terceiro ingrediente HAMBURGUER (Validar Quantidade e Valor)', function() {
        var obj = operacao.addIngredienteExtra(5,3,0, INGREDIENTES,OPCOES_CARDAPIO, lista, new PromocaoCardapioHelper(), false);
        lista = obj[0];
        valorTotalLanche = obj[1];
        expect(lista.length).toEqual(2);
        expect(lista[1].quantidade).toEqual(2);
        expect(lista[1].valorTotal).toEqual(lista[1].ingrediente.valor*2);
    })

    it('T19 - adicionar o terceiro ingrediente HAMBURGUER (Validar Desconto e Valor Total)', function() {
        var obj = operacao.addIngredienteExtra(5,3,0, INGREDIENTES,OPCOES_CARDAPIO, lista, new PromocaoCardapioHelper(), false);
        lista = obj[0];
        valorTotalLanche = obj[1];
        expect(lista[1].valorDesconto).toEqual(3);
        expect(lista[1].valorTotal).toEqual(lista[1].quantidade * lista[1].ingrediente.valor - lista[1].valorDesconto);
    })

    it('T20 - adicionar QUEIJO e HAMBURGUER + 2  (Valida Desconto, Valor Total)', function() {
        var obj = operacao.addIngredienteExtra(5,5,0, INGREDIENTES,OPCOES_CARDAPIO, lista, new PromocaoCardapioHelper(), false);
        lista = obj[0];
        valorTotalLanche = obj[1];
        valorTotalLanche = promocao.aumentarQuantidade(lista[1], valorTotalLanche, lista);
        valorTotalLanche = promocao.aumentarQuantidade(lista[1], valorTotalLanche, lista);
        //valida desconto e valor total
        expect(lista[1].valorDesconto).toEqual(3);
        expect(lista[1].valorTotal).toEqual(lista[1].quantidade * lista[1].ingrediente.valor - lista[1].valorDesconto);
        //valida quantidade
        valorTotalLanche = promocao.aumentarQuantidade(lista[2], valorTotalLanche, lista);
        expect(lista[2].quantidade).toEqual(2);
    })
    it('T21 - Adicionar o Item ALFACE e Aumentado sua quantidade x3  ', () => {
        operacao.addIngredienteExtra(5,1,0, INGREDIENTES,OPCOES_CARDAPIO, lista, promocao, false);
        expect(lista[3].valorTotal).toEqual(0.40);
        valorTotalLanche = promocao.aumentarQuantidade(lista[3], valorTotalLanche, lista);
        valorTotalLanche = promocao.aumentarQuantidade(lista[3], valorTotalLanche, lista);
        valorTotalLanche = promocao.aumentarQuantidade(lista[3], valorTotalLanche, lista);
        expect(Math.round((lista[0].valorTotal+lista[1].valorTotal+
            lista[2].valorTotal+lista[3].valorTotal) * 100) / 100).toEqual(valorTotalLanche);
    });

    it('T22 - Decréscimo Item HAMBUGUER X3 (Validar Valor Desconto e Valor Total) ', () => {
        valorTotalLanche = promocao.diminuirQuantidade(lista[1], valorTotalLanche, lista);
        valorTotalLanche = promocao.diminuirQuantidade(lista[1], valorTotalLanche, lista);
        valorTotalLanche = promocao.diminuirQuantidade(lista[1], valorTotalLanche, lista);
        expect(lista[1].valorTotal).toEqual(lista[1].ingrediente.valor * lista[1].quantidade - lista[1].valorDesconto);
        expect(Math.round((lista[0].valorTotal+lista[1].valorTotal+
            lista[2].valorTotal+lista[3].valorTotal) * 100) / 100).toEqual(valorTotalLanche);
    });

    it('T23 - Adicionar Item BACON e validar anulação da (PROMOÇÃO LIGHT) ', function() {
        var obj = operacao.addIngredienteExtra(2,2,0, INGREDIENTES,OPCOES_CARDAPIO, lista, promocao, false);
        lista = obj[0];
        valorTotalLanche = obj[1];
        expect(Math.round((lista[0].valorTotal+lista[1].valorTotal+
            lista[2].valorTotal+lista[3].valorTotal) * 100) / 100).toEqual(valorTotalLanche);
    })

});