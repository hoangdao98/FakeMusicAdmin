import { Component, OnInit } from '@angular/core';
import { Album } from '../../../models/album';
import { Users } from '../../../models/user';
import { AlbumService } from '../../../album.service';
import { UserService} from '../../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  albums : Album[];
  users: Users[];
  files: any[] = [];
  selectedFile: File = null;
  form: any;
  private imageSrc: string = '';

  constructor(private albumService: AlbumService) {
  }

  ngOnInit() {
  }

  uploadFile(event) {
    let elem = event.target;
    if ( elem.files.length > 0) {
      this.files.push(elem.files[0]);
      console.log(this.files);
      this.selectedFile = <File>event.target.files[0];
    }
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
    // console.log(this.imageSrc);
  }

  add(name: string, singer: string, description: string, year: Date, image: any): void {
    name = name.trim();
    if(!name) { return; }
    const newAlbum: Album =  new Album();
    newAlbum.name  = name;
    newAlbum.singer = singer;
    newAlbum.description = description;
    newAlbum.year = year;
    newAlbum.image = this.imageSrc;
    this.albumService.addAlbum(newAlbum)
      .subscribe(
        data => {
          // this.albums.push(data);
          console.log(data);
        }
      );
  }
}
