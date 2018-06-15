import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Publication } from './../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from './../../services/user.service';
import { PublicationService } from './../../services/publication.service';

@Component({
  selector: "timeline",
  templateUrl: "./timeline.component.html",
  providers: [UserService, PublicationService]
})

export class TimelineComponent implements OnInit {

  public identity;
  public token;
  public titulo: string;
  public url: string;
  public status: string;
  public page;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.titulo = 'Timeline'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getPublications(this.page);
  }

  getPublications(page) {
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        console.log(response);
        this.status = 'success';
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