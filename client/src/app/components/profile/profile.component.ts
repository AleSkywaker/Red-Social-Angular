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
  public followed;
  public following;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.titulo = "Perfil";
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.followed = false;
    this.following = false;
  }
  ngOnInit() {
    this.loadPage()
  }
  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.getCounter(id);
    })
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(response => {
      if (response.user) {
        console.log("response", response);
        this.user = response.user;

        if (response.following && response.following._id) {
          this.following = true;
        } else {
          this.following = false;
        }

        if (response.followed && response.followed._id) {
          this.followed = true;
        } else {
          this.followed = false;
        }

      } else {
        this.status = "error";
      }
    }, error => {
      console.log(<any>error);
      this._router.navigate(['/perfil', this.identity._id])
    })
  }

  getCounter(id) {
    this._userService.getCounter(id).subscribe(
      response => {
        console.log("stats", response)
        this.stats = response
      }, error => {
        console.log(<any>error);
      })
  }

  followUser(followed) {
    var follow = new Follow("", this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        this.following = true;
      }, error => {
        console.log(<any>error)
      }
    )
  }
  unFollowUser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        this.following = false;
      }, error => {
        console.log(<any>error);
      }
    )
  }
  public followUserOver;
  mouseEnter(userId) {
    this.followUserOver = userId
  }
  mouseLeave() {
    this.followUserOver = 0;
  }

}



