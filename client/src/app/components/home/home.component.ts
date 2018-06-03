import { Component, OnInit } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  public titulo: string;

  constructor() {
    this.titulo = "Bienvenido a la Red Social";
  }
  ngOnInit() {
    console.log("Home.compnente cargado ");
  }
}
