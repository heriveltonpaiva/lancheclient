import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { AppComponent } from './app.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { IngredienteDetailComponent} from './ingrediente-detail/ingrediente-detail.component';
import { IngredienteService } from './ingrediente/ingrediente.service';
import { MessageComponent } from './messages/message.component';
import { MessageService } from './messages/message.service';

@NgModule({
  declarations: [
    AppComponent,
    IngredienteComponent,
    IngredienteDetailComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule 
  ],
  providers: [
    IngredienteService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
