import { OpcaoIngrediente } from "../opcao-ingrediente/opcao-ingrediente";
import { Ingrediente } from "../ingrediente/ingrediente";
import { PromocaoCardapioHelper } from "./promocao-helper";
import { OpcaoCardapio } from "../opcao-cardapio/opcaocardapio";

export class OperacaoCardapioHelper{

    /** Verifica se existe um ingrediente na listagem, se tiver atualiza o valor da quantidade, 
     * se não adiciona a opção na listagem criando um novo objeto*/
    addIngredienteExtra(idOpcao:number, 
                        idIngrediente:number, 
                        valorTotalLanche:number,
                        ingredientes:Ingrediente[], 
                        opcoes: OpcaoCardapio[],
                        listaOpcaoIngredientes:OpcaoIngrediente[], 
                        promocaoCardapio:PromocaoCardapioHelper, 
                        promocaoLight:boolean):[OpcaoIngrediente[], number] {
        var novoObj:OpcaoIngrediente;
        console.log('VAAAAAAAAAAAAAAAAAA'+valorTotalLanche);
        //adicionar novo ingrediente
		if (!this.atualizarValorIngrediente(idIngrediente, valorTotalLanche, listaOpcaoIngredientes, promocaoCardapio)) {
            var objEncapsulado = this.getObjEncapsulado(idOpcao, idIngrediente, valorTotalLanche);
            novoObj = <OpcaoIngrediente> this.criarNovaOpcaoIngrediente(objEncapsulado, ingredientes, opcoes);	
            if(listaOpcaoIngredientes == undefined){
                listaOpcaoIngredientes = [novoObj];
            }else{
                listaOpcaoIngredientes.push(novoObj);	
            }
            promocaoCardapio.calcularDesconto(novoObj);
            promocaoCardapio.calcularPromocaoLight(listaOpcaoIngredientes, valorTotalLanche);          
        }
        return [listaOpcaoIngredientes,this.calcularValorTotalNaAdicao(listaOpcaoIngredientes)];
    }

    calcularValorTotalNaAdicao(lista:OpcaoIngrediente[]):number{
        var valorTotalLanche = 0;
        lista.forEach(element => {
            valorTotalLanche += element.valorTotal;
            console.log('VALOR TOTAL'+element.valorTotal);
        });
      return valorTotalLanche;
    }
    
    /** Cria uma nova opção de ingrediente */
    criarNovaOpcaoIngrediente(opcaoObj:OpcaoIngrediente, ingredientes:Ingrediente[], opcoes:OpcaoCardapio[]):OpcaoIngrediente{
        var obj = this.getNovoObjeto();
        //realiza a busca dos objetos opcaoCardapio e Ingrediente
        obj.ingrediente = ingredientes.find(x => x.id == opcaoObj.ingrediente.id);
        if (opcaoObj.opcaoCardapio.id != 5){
            obj.opcaoCardapio = opcoes.find(x => x.id == opcaoObj.opcaoCardapio.id);
        }
        console.log("Criando novo objeto:"+opcaoObj.ingrediente.id + opcaoObj.opcaoCardapio.id);
        //adiciona o elemento novo na listagem
        return <OpcaoIngrediente>obj;
    }

    /** Atualiza o valor do ingrediente caso ele já exista */
    atualizarValorIngrediente(idIngrediente: number, valorTotalLanche:number, 
        listaOpcaoIngredientes: OpcaoIngrediente[], promocaoCardapio: PromocaoCardapioHelper): boolean {
        //a lista será vazia quando for adicionado o primeiro ingrediente da opção customizado
        if(listaOpcaoIngredientes == undefined)
           return false;    
		var encontrou = false;
		listaOpcaoIngredientes.forEach(element => {
			console.log(idIngrediente + "" + element.ingrediente.id);
			if (element.ingrediente.id == idIngrediente) {
				promocaoCardapio.aumentarQuantidade(element, valorTotalLanche, listaOpcaoIngredientes);
                encontrou = true;
                promocaoCardapio.calcularDesconto(element)
                promocaoCardapio.calcularPromocaoLight(listaOpcaoIngredientes, valorTotalLanche);
			}
		    }
        );

		return encontrou;
	}

    /** Remove um ingrediente  */
	removerIngrediente(obj: OpcaoIngrediente, valorTotalLanche:number, listaOpcaoIngredientes:OpcaoIngrediente[]):number {
        console.log(obj.ingrediente.valor+" - "+obj.quantidade)
        if (obj.quantidade > 1)
            valorTotalLanche = valorTotalLanche - (obj.ingrediente.valor * obj.quantidade);
		var objetoRemover = listaOpcaoIngredientes.find(x => x.ingrediente == obj.ingrediente);
        var index = listaOpcaoIngredientes.indexOf(objetoRemover);
        listaOpcaoIngredientes.splice(index,1);
        var promocao = new PromocaoCardapioHelper();
        valorTotalLanche = promocao.calcularPromocaoLight(listaOpcaoIngredientes, valorTotalLanche);
        return valorTotalLanche;
	}

    private getObjEncapsulado(idOpcao:number, idIngrediente:number, valorTotal:number):OpcaoIngrediente{
        var obj = {id: 0, opcaoCardapio: {id:idOpcao}, ingrediente: {id:idIngrediente}, quantidade: 1, valorDesconto: 0, valorTotal: valorTotal};
        return <OpcaoIngrediente>obj;
    }
    private getNovoObjeto():OpcaoIngrediente{
        return this.getObjEncapsulado(0, 0, 0);
    }
}