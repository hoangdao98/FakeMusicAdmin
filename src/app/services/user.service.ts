import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private oauthUrl = "http://localhost:8000/oauth/token";
  private userUrl = "http://localhost:8000/api/user";

  getAccessToken() {
    let headers = new HttpHeaders({
      "Content-type": "application/json",
      "Accept": "application/json"
    });

    let postData = {
        grant_type: "password",
        client_id: 2,
        client_secret: "ttn21RPJpFmcqTOR8KtTtdTjj1fXiib3QBuwKWUH",
        username: "hreichel@example.net",
        password: "secret",
        scope: ""
    }

    return this.http.post(this.oauthUrl, postData, {
        headers: headers
    })
      .pipe(
        map((res:any ) => res),
        catchError(error => of([]))
      );
}

getUsers(accessToken: string): Observable<any> {

    var headers = new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + accessToken,
    });

    return this.http.get(this.userUrl, {
        headers: headers
    })
      .pipe(
        map((res: any) => res),
        catchError(error => of([]))
      )
}
}
