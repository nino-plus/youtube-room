import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-video',
  templateUrl: './room-video.component.html',
  styleUrls: ['./room-video.component.scss']
})
export class RoomVideoComponent implements OnInit {
  @Input() channelId: string;

  private player: YT.Player;
  playerVars = {
    controls: 0,
  };

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getPlayVideo(this.channelId).pipe(
      map(doc => doc && doc.videoId)
    ).subscribe((videoId) => {
      if (this.player) {
        this.player.loadVideoById(videoId);
      }
    });
  }

  savePlayer(player) {
    this.player = player;
    this.player.playVideo();
  }
}
