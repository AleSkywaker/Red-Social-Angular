import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService {
  public url;
  public identity;
  public token;

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

  signup(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-type", "application/json");

    return this._http.post(this.url + "/login", params, { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identity"));

    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = JSON.parse(localStorage.getItem("token"));

    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
