import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { User } from "./../../models/follow";
import { UserService } from "../../services/user.service";

@Component({
  selector: "user-edit",
  templateUrl: "./user-edit.component.html",
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public titulo: string;
  public user: User;
  public identity;
  public token;
  public status;

  constructor(
    private _router: ActivatedRoute,
    private _route: Router,
    private _userService: UserService
  ) {
    this.titulo = "Actualizar mis datos";
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log("Desde User-edit", this.user);
    console.log("user edit cargado");
  }

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = "error";
        } else {
          this.status = "success";
          localStorage.setItem("identity", JSON.stringify(this.user));
          this.identity = this.user;

          //Subida imagen de usuario
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
