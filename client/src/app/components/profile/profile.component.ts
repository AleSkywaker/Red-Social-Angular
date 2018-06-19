import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Publication } from './../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from './../../services/user.service';
import { PublicationService } from './../../services/publication.service';

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  providers: [UserService, PublicationService]
})

export class ProfileComponent implements OnInit {
  public titulo: String;
  constructor() {
    this.titulo = "Profile"
  }
  ngOnInit() { }
}


