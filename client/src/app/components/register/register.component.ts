import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";

import { UserService } from "../../services/user.service";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public titulo: string;
  public user: User;
  public status: String;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.titulo = "Registrate";
    this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
  }

  ngOnInit() {
    console.log("Componente de registro cargado");
  }

  onSubmit(form) {
    console.log("this user", this.user)
    this._userService.registro(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = "success";
          console.log("user");
          form.reset();
        }
      },
      error => {
        this.status = "error";
        console.log("error");
        console.log(<any>error);
      }
    );
  }
}
