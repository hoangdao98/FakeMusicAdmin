import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AlbumService } from '../../album.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  // private tracks;
  // private album;
  private albums;
  p = 1;
  private buffer: any[] = [];
  constructor(private router: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit() {
    // let id = this.router.snapshot.paramMap.get('id');
    // this.albumService.getTracks(id).subscribe(
    // 	data => this.tracks = data
    // );
    // this.albumService.getAlbum(id).subscribe(
    // 	(data:any) => {
    //     this.album = data.data
    //   }
    // );
    var self = this;
    $(window).on("scroll", function() {
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      console.log(scrollPosition);
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        self.loading();
      }
    });

    this.albumService.getAlbums(this.p).subscribe((data: any) => {
      this.buffer = this.buffer.concat(data.data)
    });
  }
  loading() {
    this.p++;
    this.albumService.getAlbums(this.p).subscribe((data:any) => {
      this.buffer = this.buffer.concat(data.data)
    });
  }
}
