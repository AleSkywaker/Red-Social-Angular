import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService {
  public url: string;
  public user_to_register: User;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  registro(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-type", "application/json");

    return this._http.post(this.url + "/register", params, {
      headers: headers
    });
  }
}
