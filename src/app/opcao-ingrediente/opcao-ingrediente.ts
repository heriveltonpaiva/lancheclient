import { Ingrediente } from "../ingrediente/ingrediente";
import { OpcaoCardapio } from "../opcao-cardapio/opcaocardapio";

export class OpcaoIngrediente {
  id: number;
  opcaoCardapio:OpcaoCardapio;
  ingrediente: Ingrediente;
  quantidade: number;
  valorDesconto: number;
  valorTotal: number;
}