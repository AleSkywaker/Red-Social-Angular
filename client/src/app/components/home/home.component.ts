import { Component, OnInit } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public titulo: string;
  public random;
  public quotes;
  public testhtml;
  public testhtml2;
  public testhtml3;
  constructor() {
    this.titulo = "Bienvenido a la Red Social";
    this.testhtml;
    this.testhtml2;
    this.testhtml3;
    this.quotes = [
      {
        "quote": "\"En un mundo conectado",
        "source": "el individuo es mas fuerte",
        "blas": "y vive mejor\""
      },
      {
        "quote": "\"Trabaja",
        "source": "duro",
        "blas": "todos los dias\""
      },
      {
        "quote": "\"El hombre no conoce",
        "source": "nada que le pueda parar,",
        "blas": "solo el mismo\""
      },
      {
        "quote": "\"El verdadero misterio",
        "source": "del mundo es lo visible,",
        "blas": "no lo invisible\""
      },
      {
        "quote": "\"Confiamos demasiado",
        "source": "en los sistemas",
        "blas": "y muy poco en los hombres\""
      },
      {
        "quote": "\"Nadie encuentra su camino",
        "source": "sin haberse perdido",
        "blas": "varias veces\""
      },
      {
        "quote": "\"Lo unico imposible",
        "source": "es aquello que no intentas\""
      },
      {
        "quote": "\"Hazlo",
        "source": "y si te da miedo,",
        "blas": "hazlo con miedo\""
      },
      {
        "quote": "\"Be who you were",
        "source": "created to be, and you will",
        "blas": "set the world on fire.\""
      },
      {
        "quote": "\"If you don't go after what you want, you'll never have it.",
        "source": "If you don't ask, the answer is always no.",
        "blas": "If you don't step forward, you're always in the same place.\""
      },
      {
        "quote": "\"The universe reveals its secrets",
        "source": "to those who dare to follow",
        "blas": "their hearts.\""
      }
    ]
  }

  ngOnInit() {
    this.random = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.testhtml = this.random.quote
    this.testhtml2 = this.random.source
    this.testhtml3 = this.random.blas
    this.fraseAleatroria()
  }
  fraseAleatroria() {
    setInterval(() => {
      this.random = this.quotes[Math.floor(Math.random() * this.quotes.length)];
      this.testhtml = this.random.quote
      this.testhtml2 = this.random.source
      this.testhtml3 = this.random.blas
    }, 20000);
  }
}
