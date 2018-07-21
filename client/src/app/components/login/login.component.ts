import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public titulo: string;
  public user: User;
  public status: string;
  public identity: any;
  public token;
  public name;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.titulo = "Identificate";
    this.user = new User("", "", "", "", "", "ROLE_USER", "");
  }

  ngOnInit() {
    console.log("Componente de login cargado");
  }
  onSubmit() {
    //llamar al usuario y conseguir los datos
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;
        this.name = response.user.name;
        if (!this.identity || !this.identity._id) {
          this.status = "error";
        } else {
          //Persistir datos del usuario en localStorage
          localStorage.setItem("identity", JSON.stringify(this.identity));

          //Conseguir tokken
          this.getToken();
        }
      },
      error => {
        let errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  getToken() {
    this._userService.signup(this.user, "true").subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem("token", JSON.stringify(this.token));
        if (this.token <= 0) {
          this.status = "error";
        } else {
          //Persistir el toeken del usuario

          //Conseguir contadores o estadisticas del usuario
          this.getCounters();
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

  getCounters() {
    this._userService.getCounter().subscribe(
      response => {
        localStorage.setItem("stats", JSON.stringify(response));
        this.status = "success";
        this._router.navigate(["/"]);
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
