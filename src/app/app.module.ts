import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // add this
import { HttpClientModule } from '@angular/common/http';

import { AlbumService } from './album.service';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { AlbumComponent } from './home/album/album.component';
import { AddComponent } from './home/album/add/add.component';
import { EditComponent } from './home/album/edit/edit.component';
import { DeleteComponent } from './home/album/delete/delete.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SongsComponent } from './home/songs/songs.component';
import { ArtistsComponent } from './home/artists/artists.component';

// Import your library
import { OwlModule } from 'ngx-owl-carousel';
import { UserComponent } from './home/user/user.component';
import { LoginComponent } from './login/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    NavComponent,
    DashboardComponent,
    SongsComponent,
    ArtistsComponent,
    UserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    OwlModule,
    ReactiveFormsModule
  ],
  providers: [AlbumService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
