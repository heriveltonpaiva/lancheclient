
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IngredienteDetailComponent } from './ingrediente-detail/ingrediente-detail.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { OpcaoCardapioComponent }      from './opcao-cardapio/opcao-cardapio.component';
import { PedidoComponent }      from './pedido/pedido.component';
import { OpcaoIngredienteComponent } from './opcao-ingrediente/opcao-ingrediente.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: IngredienteDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ingredientes', component: IngredienteComponent},
  { path: 'opcoesCardapio', component: OpcaoCardapioComponent },
  { path: 'realizarPedido', component: PedidoComponent },
  { path: 'tabelaIngredientes/:id', component: OpcaoIngredienteComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }