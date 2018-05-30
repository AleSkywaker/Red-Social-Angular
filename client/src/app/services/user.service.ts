import { Observable } from "rxjs/Observable";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService {
  public url: string;
  public user_to_register: User;

  constructor(public _http: HttpClientModule) {
    this.url = GLOBAL.url;
  }

  registro(user_to_register) {
    console.log("Usuario a registrar", user_to_register);
  }
}
