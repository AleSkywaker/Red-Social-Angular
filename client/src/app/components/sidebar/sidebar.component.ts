import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UserService, PublicationService, UploadService]
})

export class SidebarComponent implements OnInit {
  public titulo;
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public publication: Publication;

  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _uploadService: UploadService
  ) {
    this.titulo = "Sidebar";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication("", "", "", "", this.identity._id)
  }

  ngOnInit() {
    console.log("Sidebar.componten ha sido cargado")
    console.log("STATS", this.stats);

  }

  onSubmit(form, event) {
    console.log(this.publication)
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {
          // this.publication = response.publication;
          if (this.filesToUpload && this.filesToUpload.length) {
            //Subir imagen
            this._uploadService.makeFileRequest(this.url + '/upload-image-pub/' + response.publication._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                this.publication.file = result.image;
                this.status = 'success';
                form.reset();
                this.sended.emit({ send: 'true' })
                this._router.navigate(['/timeline']);
              })
          } else {
            this.status = 'success';
            form.reset();
            this.sended.emit({ send: 'true' })
            this._router.navigate(['/timeline']);
          }
        } else {
          this.status = 'error';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    console.log("imagen ", fileInput.target.files);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  //Output
  @Output() sended = new EventEmitter();
  sendPublication(event) {
    this.sended.emit({ send: 'true' })
  }
}