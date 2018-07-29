import { Component, OnInit } from '@angular/core';
import  { ActivatedRoute, ParamMap} from '@angular/router';

import { AlbumService } from '../../album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
	private tracks;
	private album;
  p = 1;
	panelOpenState = false;
  constructor(private router: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit() {
  	let id = this.router.snapshot.paramMap.get('id');
  	this.albumService.getTracks(id).subscribe(
  		data => this.tracks = data
  	);
  	this.albumService.getAlbum(id).subscribe(
  		(data:any) => {
        this.album = data.data
      }
  	);
  }
// loading(){
//   this.p++;
//   getAlbum(id, this.p){
//     data.data
//      let array = [...this.album, ...data.data];
//      this.album = array;
//   }
// }
}
