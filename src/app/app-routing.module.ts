import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './home/album/album.component';
const appRoute : Routes = [
	{path: '', component: HomeComponent},
	{path: 'albums', component: AlbumComponent},
	{path: 'albums/:id/audio', component: AlbumComponent},
	{path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoute),
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
