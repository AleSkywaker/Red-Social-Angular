import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { SendedComponent } from './components/sended/sended.component';

const messagesRoutes: Routes = [
  {
    path: 'mensajes',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'recibidos', pathMatch: 'full' },
      { path: 'enviar', component: AddComponent },
      { path: 'recibidos', component: ReceiverComponent },
      { path: 'enviados', component: SendedComponent },
      { path: 'enviados/:page', component: SendedComponent }
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(messagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessagesRoutingModule { }