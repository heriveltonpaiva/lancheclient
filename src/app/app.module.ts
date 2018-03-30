import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { IngredienteDetailComponent} from './ingrediente-detail/ingrediente-detail.component';
import { IngredienteService } from './ingrediente/ingrediente.service';
import { MessageComponent } from './messages/message.component';
import { MessageService } from './messages/message.service';

import { AppRoutingModule }     from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IngredienteComponent,
    IngredienteDetailComponent,
    MessageComponent,
    AppNavbarComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule 
  ],
  providers: [
    IngredienteService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
