import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room/room.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChannelDescriptionComponent } from './channel-description/channel-description.component';
import { RoomUsersComponent } from './room-users/room-users.component';
import { RoomVideoComponent } from './room-video/room-video.component';
import { VideoActionsBtnComponent } from './video-actions-btn/video-actions-btn.component';

@NgModule({
  declarations: [RoomComponent, ChatListComponent, ChannelDescriptionComponent, RoomUsersComponent, RoomVideoComponent, VideoActionsBtnComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    DragDropModule,
    NgxYoutubePlayerModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule
  ],
})
export class RoomModule { }
