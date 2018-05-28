import { Component, OnInit } from "@angular/core";

@Component({
  selector: "register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
  public titulo: string;

  constructor() {
    this.titulo = "Registro";
  }

  ngOnInit() {
    console.log("Componente de registro cargado");
  }
}
