import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { User } from '../../models/user'
import { Follow } from '../../models/follow'
import { GLOBAL } from '../../services/global';
import { UserService } from './../../services/user.service';
import { FollowService } from './../../services/follow.service';


@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  providers: [UserService, FollowService]
})

export class ProfileComponent implements OnInit {
  public titulo: String;
  public url: String;
  constructor() {
    this.titulo = "Profile";
    this.url = GLOBAL.url;
  }
  ngOnInit() { }
}


