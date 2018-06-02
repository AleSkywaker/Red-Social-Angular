import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "./../../services/user.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public titulo: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public name;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.titulo = "Identificate";
    this.user = new User("", "", "", "", "", "ROLE_USER", "", "");
  }

  ngOnInit() {
    console.log("Componente de login cargado");
  }
  onSubmit() {
    //llamar al usuario y conseguir los datos
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;
        console.log(this.identity);
        this.name = response.user.name;
        if (!this.identity || !this.identity._id) {
          this.status = "error";
        } else {
          this.status = "success";
          //Persistir datos del usuario

          //Conseguir tokken
          this.getToken();
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
    // console.log(this.user);subscribessubscribe
  }

  getToken() {
    this._userService.signup(this.user, "true").subscribe(
      response => {
        this.token = response.token;
        console.log(this.token);
        if (this.token <= 0) {
          this.status = "error";
        } else {
          this.status = "success";
          //Persistir el toeken del usuario

          //Conseguir contadores o estadisticas del usuario
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }
}
