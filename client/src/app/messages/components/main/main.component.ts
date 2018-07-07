import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {
  public titulo: String;

  constructor() {
    this.titulo = "Mensajeria";
  }
  ngOnInit() {
    console.log("Componente mensajeria cargado");
  }
}