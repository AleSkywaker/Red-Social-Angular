import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { User } from '../../models/user'
import { Follow } from '../../models/follow'
import { GLOBAL } from '../../services/global';
import { FollowService } from './../../services/follow.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  providers: [UserService, FollowService]
})

export class ProfileComponent implements OnInit {
  public titulo: String;
  public user: User;
  public status: String;
  public identity;
  public token;
  public stats;
  public url: String;
  public follow: Follow;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followServie: FollowService
  ) {
    this.titulo = "Profile";
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  ngOnInit() { }
}


