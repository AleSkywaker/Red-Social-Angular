import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global'


@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  providers: [UserService]
})

export class UserComponent implements OnInit {
  public titulo: String;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.titulo = "Gente";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log('User.componente ha sido cargado')
  }


}



