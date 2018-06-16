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
  public pages;
  public page;
  public publications: Publication[];
  public total;
  public itemsPerPage;

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
    this.getPublications(this.pages);
  }

  getPublications(page, adding = false) {
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        if (response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;
          this.publications = response.publications;
          console.log(response);
          this.status = 'success';

          if (!adding) {
            this.publications = response.publications;
          } else {
            let arrayA = this.publications;
            let arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);
          }

          if (page > this.pages) {
            this._router.navigate(['/home'])
          }
        } else {
          this.status = "error"
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
  public noMore = false;
  viewMore() {
    if (this.publications.length == this.total) {
      this.noMore = true;
    } else {
      this.page += 1;
    }
    this.getPublications(this.page, true)
  }
}