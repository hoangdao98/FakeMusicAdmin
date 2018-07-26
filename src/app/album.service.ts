import { Injectable } from '@angular/core';
import { Album } from './models/album';

import { catchError, map, tap } from 'rxjs/operators';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

	 private albums = [];
	 private newAlbum = { };
	 private tracks;
	 private oAuthURL = "http://localhost:8000/oauth/token";
	 private apiURL = "http://localhost:8000/api/albums";
	 private accessToken = [];
	 private headers = new HttpHeaders();
	 private options = { headers: this.headers };

	  private postData = {
	   grant_type: "password",
	   client_id: 2,
	   client_secret: "ktos1YAvGr5xSPWTfuIlVspJbi9zZt2jIrcUz0VC",
	   username: "dhauck@example.net",
	   password: "secret"
	 }

	constructor(
  	private http: HttpClient ) {
  		console.log('Data service connected');
  		this.headers = this.headers.append('Content-Type', 'application/json');
  		this.headers = this.headers.append('Accept', 'application/json');
  		console.log(this.headers);
  	 }

	getAlbums() {
	   	return this.http.get<Album[]>(this.apiURL, this.options ).pipe(
	   		tap((res:any) => {console.log(res.data)}),
	   		catchError(error => of([]))
	   	);
 	}

 	getToken() {
	   return this.http.post<any>(this.oAuthURL, this.postData, this.options).pipe(
	   		map(token => token.access_token),
	   		catchError(error => of([]))
	   	);
	}

	setToken(token) {
	   this.headers = this.headers.append('Authorization', 'Bearer ' + token); // add the Authentication header
	   this.accessToken = token;
	   console.log(this.headers);
	}

	getTracks(id){
		return this.http.get(this.apiURL+'/'+id+'/audio');
	}

	getAlbum(id){
		return this.http.get(this.apiURL+'/'+id);
	}

  
}
