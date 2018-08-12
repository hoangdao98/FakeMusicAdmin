import { Injectable } from '@angular/core';
import { Album } from './models/album';

import { catchError, map, tap } from 'rxjs/operators';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albums = [];
  private newAlbum = {};
  private tracks;
  private oAuthURL = "http://localhost:8000/oauth/token";
  private apiURL = "http://localhost:8000/api/albums";
  private accessToken;
  private headers = new HttpHeaders();
  private options = { headers: this.headers };

  private postData = {
    grant_type: "password",
    client_id: 2,
    client_secret: "ttn21RPJpFmcqTOR8KtTtdTjj1fXiib3QBuwKWUH",
    username: "hreichel@example.net",
    password: "secret"
  }

  constructor(
    private http: HttpClient) {
    console.log('Data service connected');
    this.getToken();
    this.setToken();
  }

  getAlbums(page): Observable<Album> {
    return this.http.get<Album>(this.apiURL + "/?page=" + page, this.options).pipe(
      tap((res: any) => { console.log(res.data) }),
      catchError(error => of([]))
    );
  }

  getToken() {
    return this.http.post<any>(this.oAuthURL, this.postData, this.options).pipe(
      map(token => token.access_token),
      catchError(error => of([]))
    ).subscribe((data:any) => {
      localStorage.setItem("token", data);
    });
  }

  setToken() {
    let token = localStorage.token;
    let headers = new HttpHeaders()
                  .set('Accept', 'application/json')
                  .set('Content-Type', 'application/json')
                  .set('Authorization', 'Bearer ' + token);
    this.options.headers = headers;
  }

  getTracks(id) {
    return this.http.get(this.apiURL + '/' + id + '/audio');
  }

  getAlbum(id) {
    return this.http.get(this.apiURL + '/' + id).pipe(
      tap(res => console.log(res))
      );
  }

  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiURL, album, this.options)
      .pipe(
        tap((album: Album) => console.log(`inserted album = ${JSON.stringify(album)}`)),
        catchError(error => of(new Album()))
      );
  }

  deleteAlbum(albumId: number): Observable<Album>{
     const url = `${this.apiURL}/${albumId}`;
     console.log(url);
     return this.http.delete<Album>(url, this.options).pipe(
         tap(_ => console.log(`Delete album with id = ${albumId}`),
         catchError(error => of(null)))
      );
  }

  updateAlbum(album: Album): Observable<Album>{
    return this.http.put<Album>(`${this.apiURL}/${album.id}`, album, this.options)
    .pipe(
        tap(album => console.log(`inserted album = ${JSON.stringify(album)}`)),
        catchError(error => of(new Album()))
     );
  }



}
