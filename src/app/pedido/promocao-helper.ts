import { OpcaoIngrediente } from "../opcao-ingrediente/opcao-ingrediente";

export class PromocaoCardapioHelper {
 
    calcularPromocaoLight(listaOpcaoIngredientes:OpcaoIngrediente[], promocaoLight:boolean, valorTotalLanche:number):boolean{
        var alface = listaOpcaoIngredientes.find(x => x.ingrediente.id == 1);
        var bacon = listaOpcaoIngredientes.find(x => x.ingrediente.id == 2);
        promocaoLight = !bacon;
        if(promocaoLight && (alface != null || alface != undefined)){
               //verifica se o alface é o primeiro ingrediente adicionado no pedido customizado
              if(valorTotalLanche > 0)
                    valorTotalLanche = valorTotalLanche - (valorTotalLanche * 0.10);
             else
                  valorTotalLanche = alface.ingrediente.valor;
             console.log("Promoção LIGHT!:"+valorTotalLanche);
             promocaoLight = true;
          return true;
        }
      return false;
    }
    aumentarQuantidade(obj:OpcaoIngrediente, valorTotalLanche:number, listaOpcaoIngredientes:OpcaoIngrediente[]){
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
      this.calcularPromocaoLight(listaOpcaoIngredientes, false, valorTotalLanche);
    }
  
    diminuirQuantidade(obj:OpcaoIngrediente, valorTotalLanche:number, listaOpcaoIngredientes:OpcaoIngrediente[]){
        if(obj.quantidade == 1 && obj.id == 0)
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
        this.calcularPromocaoLight(listaOpcaoIngredientes, false, valorTotalLanche);
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
  
}