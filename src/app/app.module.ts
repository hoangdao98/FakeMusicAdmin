import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // add this
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import { MatCardModule, 
          MatIconModule, 
          MatToolbarModule, 
          MatButtonModule, 
          MatFormFieldModule, 
          MatInputModule, 
          MatSidenavModule, 
          MatListModule,
          MatGridListModule,
          MatExpansionModule } from '@angular/material';

import { AlbumService } from './album.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './home/album/album.component';
import { AddComponent } from './home/album/add/add.component';
import { EditComponent } from './home/album/edit/edit.component';
import { DeleteComponent } from './home/album/delete/delete.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    MatGridListModule,
    MatExpansionModule
  ],
  providers: [AlbumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
