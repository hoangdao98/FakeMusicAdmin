import { Injectable , EventEmitter } from '@angular/core';
import { Song } from './models/song';

import { catchError, map, tap } from 'rxjs/operators';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface PlayerEvents {
	onEnd$: EventEmitter<any>;
	onStop$: EventEmitter<any>;
	onPlay$: EventEmitter<any>;
	onPause$: EventEmitter<any>;
	playing$: EventEmitter<any>;
}

var han = new EventEmitter();

@Injectable({
	providedIn: 'root'
})
export class AudioService {

	private apiURL = "http://localhost:8000/api/audios";

	constructor(private http: HttpClient) {}

	getAudios(page): Observable<any> {
		return this.http.get<Song[]>(this.apiURL + "/?page=" + page).pipe(
			tap((res: any) => { console.log(res.data) }),
			catchError(error => of([]))
			);
	}


}



