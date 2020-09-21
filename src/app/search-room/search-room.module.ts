import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoomRoutingModule } from './search-room-routing.module';
import { SearchRoomComponent } from './search-room/search-room.component';
import { FormsModule } from '@angular/forms';
import { ResultRoomComponent } from './result-room/result-room.component';



@NgModule({
  declarations: [SearchRoomComponent, ResultRoomComponent],
  imports: [
    CommonModule,
    SearchRoomRoutingModule,
    FormsModule
  ]
})
export class SearchRoomModule { }
