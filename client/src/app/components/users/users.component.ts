import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  providers: [UserService, FollowService]
})

export class UserComponent implements OnInit {
  public titulo: String;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public status;
  public pages;
  public total;
  public users: Array<User>;
  public url;
  public follows;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.titulo = "Gente";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('User.componente ha sido cargado');
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;

      if (!params['page']) {
        page = 1;
      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;
        this.prev_page <= 0 ? this.prev_page = 1 : this.prev_page;
      }
      //Devolver listado de usuarios
      this.getUsers(page);
    })
  }

  getUsers(page) {
    this._userService.getUsers(page).subscribe(
      response => {
        if (!response.users) {
          this.status = 'error';
        } else {
          console.log(response.users);
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          this.follows = response.users_following;
          if (page > this.pages) {
            this._router.navigate(['/usuarios', 1])
          }

        }
      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  public followUserOver;
  mouseEnter(user_id) {
    console.log("enter");
    this.followUserOver = user_id;
  }
  mouseLeave(user_id) {
    console.log("salir");
    this.followUserOver = 0;
  }

  followUser(followed) {
    let follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if (!response.follow) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(followed)
        }
      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  unfollowUser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        let search = this.follows.indexOf(followed);
        if (search != 1) {
          this.follows.splice(search, 1);
        }

      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

}



