import { OpcaoIngrediente } from "../opcao-ingrediente/opcao-ingrediente";

export class PromocaoCardapioHelper {
 
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
          console.log("VALOR ELEMENTO: "+valorTotalLanche);
      });
      this.calcularPromocaoLight(listaOpcaoIngredientes, valorTotalLanche);
      console.log("VALOR ELEMENTO LIGHT: "+valorTotalLanche);
      return valorTotalLanche;
    }
  
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
                    console.log("VALOR ELEMENTO: "+element.valorTotal);
                }
                }
                valorTotalLanche += element.valorTotal;
            });
            console.log("VALOR TOTAL LANCHE: "+valorTotalLanche);
            this.calcularPromocaoLight(listaOpcaoIngredientes, valorTotalLanche);
        return valorTotalLanche;
    }
    
    calcularDesconto(obj:OpcaoIngrediente){
      
      if(obj == undefined){
         <OpcaoIngrediente> obj;
         console.log('AAAAAAAAAAAAAAAAAAAAAAA');
      }
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
  
}