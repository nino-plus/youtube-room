import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';
import { FormsModule } from '@angular/forms';
import { SearchResultsRoomsComponent } from './search-results-rooms/search-results-rooms.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [TopComponent, SearchResultsRoomsComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class TopModule { }
