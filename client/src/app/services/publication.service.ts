import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { Publication } from "../models/publication";

@Injectable()
export class PublicationService {
  public stats: any;
  public url;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addPublication(token, publication): Observable<any> {
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', token)

    return this._http.post(this.url + '/publicar', params, { headers: headers })
  }
  getPublications(token, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', token)

    return this._http.get(this.url + '/publications/' + page, { headers: headers });
  }


}