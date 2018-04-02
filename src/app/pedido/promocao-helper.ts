import { OpcaoIngrediente } from "../opcao-ingrediente/opcao-ingrediente";

/**
 * Classe utilitária responsável por realizar
 * os cálculos das regras de negócio e incrementar 
 * e decrementar porçoes de ingredientes.
 * @author Herivelton Paiva
 */
export class PromocaoCardapioHelper {
 
    /** Realiza o cálculo da promoção LIGHT, no qual ao ter alface e não bacon é dado 10% de deconto no valor total do lanche */
    calcularPromocaoLight(listaOpcaoIngredientes:OpcaoIngrediente[], valorTotalLanche:number):number{
        var alface = listaOpcaoIngredientes.find(x => x.ingrediente.id == 1);
        var bacon = listaOpcaoIngredientes.find(x => x.ingrediente.id == 2);
        if(!bacon && (alface != null || alface != undefined)){
               //verifica se o alface é o primeiro ingrediente adicionado no pedido customizado
              if(valorTotalLanche > 0)
                    valorTotalLanche = valorTotalLanche - (valorTotalLanche * 0.10);
             else
                  valorTotalLanche = alface.ingrediente.valor;
              //caso não possua nem alface nem bacon (esse caso é válido após a remoção do alface)
        }else if(!bacon && !alface){
            valorTotalLanche = 0;
            listaOpcaoIngredientes.forEach(element =>{valorTotalLanche += element.valorTotal});
        }
      return valorTotalLanche;
    }
    /** Incrementa uma quantidade a mais de ingrediente ao item do cardapio e realizar os cálculos */
    aumentarQuantidade(obj:OpcaoIngrediente, valorTotalLanche:number, listaOpcaoIngredientes:OpcaoIngrediente[]):number{
      valorTotalLanche = 0;
      listaOpcaoIngredientes.forEach(element => {
          if(obj.ingrediente.id == element.ingrediente.id){
              element.quantidade ++;
              if(obj.ingrediente.id == 3 || obj.ingrediente.id == 5){ 
                  this.calcularDesconto(element);
              }else{
                  element.valorTotal = element.valorTotal + element.ingrediente.valor;
              }
          }
          valorTotalLanche += element.valorTotal;
      });
      this.calcularPromocaoLight(listaOpcaoIngredientes, valorTotalLanche);
      return valorTotalLanche;
    }
    /** Diminuir a quantidade porção de um ingrediente no cardapio, fazendo os cálculos gerais */
    diminuirQuantidade(obj:OpcaoIngrediente, valorTotalLanche:number, listaOpcaoIngredientes:OpcaoIngrediente[]):number{
        if(obj.quantidade == 1){
            throw new Error('Quantidade mínima atingida, não é possível diminuir.'); 
        }
            valorTotalLanche = 0;
            listaOpcaoIngredientes.forEach(element => {
                if(obj.id == element.id){
                    element.quantidade --;
                    if(obj.ingrediente.id == 3 || obj.ingrediente.id == 5){ 
                        this.calcularDesconto(element);
                    }else{
                        element.valorTotal = element.valorTotal - element.ingrediente.valor;;
                    }
                }
                valorTotalLanche += element.valorTotal;
            });
            this.calcularPromocaoLight(listaOpcaoIngredientes, valorTotalLanche);
        return valorTotalLanche;
    }
    
    /** Calcula o desconto a ser aplicado para a promoção mais queijo e mais carne, Pague 2 Leva 3 */
    calcularDesconto(obj:OpcaoIngrediente){
        if(obj.quantidade > 2 && obj.quantidade % 3 == 0){
            //calcula quantos itens é para pagar 
            var qntItemPagar = (obj.quantidade/3)  * 2;
            // calcula o valor de todos os itens e calcula o valor que será realmente pago
            var valorSemDesconto = obj.quantidade * obj.ingrediente.valor ;
            var valorComDesconto = qntItemPagar * obj.ingrediente.valor;
            var desconto = valorSemDesconto  - valorComDesconto;
            obj.valorDesconto = desconto;
            obj.valorTotal = qntItemPagar * obj.ingrediente.valor;
        }else{
            obj.valorDesconto = Math.floor(obj.quantidade / 3) * obj.ingrediente.valor;
            //se o valor for menor que 3 da promoção carne e queijo, o valor desconto será 0
            obj.valorTotal = obj.quantidade * obj.ingrediente.valor - (obj.quantidade <= 2 ? 0:obj.valorDesconto);
            obj.valorTotal = (obj.quantidade * obj.ingrediente.valor) - obj.valorDesconto;
        }
    
   };
  
}