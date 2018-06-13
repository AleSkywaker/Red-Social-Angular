import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Publication } from './../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from './../../services/user.service';

@Component({
  selector: "timeline",
  templateUrl: "./timeline.component.html",
  providers: [UserService]
})

export class TimelineComponent implements OnInit {

  public identity;
  public token;
  public titulo: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.titulo = 'Timeline'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {

  }


}