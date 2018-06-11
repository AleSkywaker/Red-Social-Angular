import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UserService]
})

export class SidebarComponent implements OnInit {
  public titulo;
  public identity;
  public token;
  public stats;
  public url;
  public status;

  constructor(private _userService: UserService) {
    this.titulo = "Sidebar";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Sidebar.componten ha sido cargado")

  }
}