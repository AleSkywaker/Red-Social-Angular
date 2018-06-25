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

  public titulo: string;
  public identity;
  public token;
  public url: string;
  public status: string;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public publications: Publication[];
  public showImage;

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
    // this.page = 1;
  }

  ngOnInit() {
    this.getPublications(this.page);
  }

  getPublications(page, adding = false) {
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        if (response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.page = response.page;
          this.itemsPerPage = response.items_per_page;
          console.log(response);
          this.status = 'success';

          if (!adding) {
            this.publications = response.publications;
          } else {
            let arrayA = this.publications;
            let arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

            $("html, body").animate({ scrollTop: $('html').prop('scrollHeight') }, 500)
          }

          if (page > this.pages) {
            // this._router.navigate(['/home'])
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
    this.page++;
    if (this.page == this.pages) {
      this.noMore = true;
    }
    this.getPublications(this.page, true)
  }

  refresh(e = null) {
    this.getPublications(1)
  }

  showThisImage(id) {
    this.showImage = id;
  }
  hideThisImage(id) {
    this.showImage = 0;
  }
  deletePublication(id) {
    this._publicationService.deletePublication(this.token, id).subscribe(
      response => {
        this.refresh();
      }, error => {
        console.log(<any>error);
      }
    )
  }
}