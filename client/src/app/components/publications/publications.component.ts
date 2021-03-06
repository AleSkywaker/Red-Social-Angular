import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: "publications",
  templateUrl: "./publications.component.html",
  providers: [UserService, PublicationService]
})

export class PublicationsComponent implements OnInit {

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
  @Input() user: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.titulo = 'Publicaciones'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    // this.page = 1;
  }

  ngOnInit() {
    this.getPublications(this.user, this.page);
  }

  getPublications(user, page, adding = false) {
    this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
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
    this.getPublications(this.user, this.page, true)
  }
}