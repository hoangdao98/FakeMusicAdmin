import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // add this
import { HttpClientModule } from '@angular/common/http';

import { AlbumService } from './album.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './home/album/album.component';
import { AddComponent } from './home/album/add/add.component';
import { EditComponent } from './home/album/edit/edit.component';
import { DeleteComponent } from './home/album/delete/delete.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './home/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    NavComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AlbumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
