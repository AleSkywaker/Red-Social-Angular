import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'add',
  templateUrl: './add.component.html'
})

export class AddComponent implements OnInit {
  public titulo: String;

  constructor() {
    this.titulo = "Enviar mensaje";
  }
  ngOnInit() {
    console.log("Componente add de mensajeria cargado");
  }
}