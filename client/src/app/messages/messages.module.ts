// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

//Rutas
import { MessagesRoutingModule } from './messages.routing';

//Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { SendedComponent } from './components/sended/sended.component';


@NgModule({
  declarations: [
    MainComponent,
    AddComponent,
    ReceiverComponent,
    SendedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessagesRoutingModule,
    MomentModule
  ],
  exports: [
    MainComponent,
    AddComponent,
    ReceiverComponent,
    SendedComponent
  ],
  providers: []
})

export class MessagesModule { }