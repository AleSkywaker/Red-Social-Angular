import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'receiver',
  templateUrl: './receiver.component.html'
})

export class ReceiverComponent implements OnInit {
  public titulo: String;

  constructor() {
    this.titulo = "Mensajes recibidos";
  }
  ngOnInit() {
    console.log("Componente receiver de mensajeria cargado");
  }
}