import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'sended',
  templateUrl: './sended.component.html'
})

export class SendedComponent implements OnInit {
  public titulo: String;

  constructor() {
    this.titulo = "Mensajes enviados";
  }
  ngOnInit() {
    console.log("Componente sended de mensajeria cargado");
  }
}