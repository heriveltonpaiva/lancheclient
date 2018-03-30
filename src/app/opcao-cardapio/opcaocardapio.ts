
export class OpcaoCardapio {
  id: number;
  descricao: string;
  valor: number;
  valorOriginal: number;
  ingredientes: Array<{id: number, descricao:String, valor: number}> = [];
  quantidade: number;
  valorDesconto:number;
  valorTotal:number;
}