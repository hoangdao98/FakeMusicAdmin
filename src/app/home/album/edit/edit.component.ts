import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../../models/album';
import { Users } from '../../../models/user';
import { AlbumService } from '../../../album.service';
import { UserService} from '../../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

@Input() album: Album;
private imageSrc: string = '';

  constructor(private albumService: AlbumService,
  	private route: ActivatedRoute,
  	private location: Location
  	) { }

  ngOnInit() {
  	this.getAlbum();
  }

  handleInputChange(e){
    var file = e.target.files[0];
    var pattern = /image-*/;
    console.log(pattern);
    var render = new FileReader();
    console.log(file.type.match(pattern));
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    render.onload = this._handleReaderLoaded.bind(this);
    render.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
  }

  getAlbum(): void{
  	const id = this.route.snapshot.paramMap.get('id');
  	this.albumService.getAlbum(id).subscribe((data:any) => this.album = data.data);
  }

  save(): void{
  	if (this.imageSrc != undefined){
  		this.album.newImage = this.imageSrc;
  	}
  	this.albumService.updateAlbum(this.album).subscribe(() => this.goBack());
  }

  goBack(): void {
  	this.location.back();
  }

}
