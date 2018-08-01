import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../album.service';
import * as $ from "jquery";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private albumService: AlbumService) { }
  private buffer: any[] = [];
  p=1;
  private albums;
  // public options = {
  //           loop: false,
  //           margin: 10,
  //           dots: false,
  //           nav: true,
  //           responsive: {
  //               0: {
  //                   items: 1
  //               },
  //               600: {
  //                   items: 3
  //               },
  //               1000: {
  //                   items: 10
  //               }
  //           }
  //       };

  ngOnInit() {
   //  this.albumService.getToken()
   //     .subscribe(data => {
   //        this.albumService.setToken(data);
   //        console.log(data);
   //
   //        setTimeout(() => {
   //          this.albumService.getAlbums(1)
   //              .subscribe((data:any) => {this.albums = data.data});
   //         }, 100);
   // });
   this.albumService.getAlbums(this.p).subscribe((data: any) => {
     this.buffer = this.buffer.concat(data.data)
   });
  }
}
