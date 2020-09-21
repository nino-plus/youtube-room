import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRoomComponent } from './search-room/search-room.component';


const routes: Routes = [
  {
    path: '',
    component: SearchRoomComponent
  },
  {
    path: ':searchText',
    component: SearchRoomComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoomRoutingModule { }
