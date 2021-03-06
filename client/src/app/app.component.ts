import { Component, OnInit, DoCheck } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from './services/global'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public titulo: String;
  public identity;
  public url: String;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.titulo = "Red Social";
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(["/"]);
  }
}
