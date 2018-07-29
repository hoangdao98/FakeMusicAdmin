import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { AlbumService } from '../album.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

private albums;
private newAlbum = { };
private oAuthURL = "http://localhost:8000/oauth/token";
private apiURL = "http://localhost:8000/api/albums";

private accessToken = [];

  constructor(private albumService: AlbumService) {
  }

  ngOnInit() {
   this.albumService.getToken()
      .subscribe(data => {
         this.albumService.setToken(data);
         console.log(data);

         setTimeout(() => {
           this.albumService.getAlbums()
               .subscribe((data:any) => {this.albums = data.data});
          }, 100);
  });
  // this.albumService.getAlbums().subscribe(data => console.log(this.albums));
  // this.albumService.getToken().subscribe(token=> console.log(token.access_token));
  }


}
