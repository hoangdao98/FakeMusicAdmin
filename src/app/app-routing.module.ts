import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './home/album/album.component';
import { AddComponent } from './home/album/add/add.component';
import { SongsComponent } from './home/songs/songs.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ArtistsComponent } from './home/artists/artists.component';
import { UserComponent } from './home/user/user.component';
const appRoute : Routes = [
	{path: '', component: DashboardComponent},
	{path: 'albums', component: AlbumComponent},
	{path: 'albums/create', component: AddComponent},
	{path: 'songs', component: SongsComponent},
	{path: 'artists', component: ArtistsComponent},
	{path: 'user', component: UserComponent},
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
