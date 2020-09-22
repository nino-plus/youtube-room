import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';
import { SearchResultsRoomsComponent } from './search-results-rooms/search-results-rooms.component';
import { MatDividerModule } from '@angular/material/divider';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [TopComponent, SearchResultsRoomsComponent, CreateComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    SwiperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class TopModule {}
