import { Component, OnInit } from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  public titulo: string;

  constructor() {
    this.titulo = "Identificate";
  }

  ngOnInit() {
    console.log("Componente de login cargado");
  }
}
