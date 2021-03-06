import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { Follow } from "../models/follow";

@Injectable()
export class FollowService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addFollow(token, follow): Observable<any> {
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', token)
        return this._http.post(this.url + '/follow', params, { headers: headers })
    }

    deleteFollow(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', token)
        return this._http.delete(this.url + '/follow/' + id, { headers: headers })
    }
    getFollowing(token, id = null, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', token)
        let url = this.url + '/following/'
        if (id != null) {
            url = this.url + '/following/' + id + '/ ' + page
        }
        return this._http.get(url, { headers: headers })
    }
    getFollowed(token, id = null, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', token)
        let url = this.url + '/followed/'
        if (id != null) {
            url = this.url + '/followed/' + id + '/' + page
        }
        return this._http.get(url, { headers: headers })
    }
    getMyFollows(token): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', token)
            return this._http.get(this.url +'/get-my-follows/true',{ headers: headers })
    }
}