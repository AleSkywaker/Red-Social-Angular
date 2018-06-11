import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { User } from "./../../models/user";
import { UserService } from "../../services/user.service";
import { UploadService } from './../../services/upload.service';
import { GLOBAL } from '../../services/global';


@Component({
  selector: "user-edit",
  templateUrl: "./user-edit.component.html",
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {
  public titulo: string;
  public user: any;
  public identity;
  public token;
  public status;
  public url;

  constructor(
    private _router: ActivatedRoute,
    private _route: Router,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.titulo = "Actualizar mis datos";
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Desde User-edit", this.user);
    console.log("user edit cargado");
  }

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = "error";
        } else {
          this.status = "success";
          localStorage.setItem("identity", JSON.stringify(this.user));
          this.identity = this.user;

          //Subida imagen de usuario
          this._uploadService.makeFileRequest(this.url + '/upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              console.log(result)
              this.user.image = result.user.image;
              localStorage.setItem('identity', JSON.stringify(this.user))
            })
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }
}
