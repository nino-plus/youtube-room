import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Room } from 'src/app/interfaces/room';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-search-results-rooms',
  templateUrl: './search-results-rooms.component.html',
  styleUrls: ['./search-results-rooms.component.scss'],
})
export class SearchResultsRoomsComponent implements OnInit, OnDestroy {
  @Input() resultRoom: string;

  public searchText: string;
  private subscriptions: Subscription = new Subscription();
  private uid = this.authService.uid;
  private rooms$: Observable<Room[]> = this.roomService.getRooms();
  private avatarId: number;
  rooms: Room[];

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private router: Router,
    private snackber: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.user$.subscribe((user) => {
        this.uid = user?.uid;
        this.avatarId = user?.avatarId;
      })
    );
    this.subscriptions.add(
      this.rooms$.subscribe((rooms) => {
        this.rooms = rooms;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createRoom(
    channelId: string,
    title: string,
    description: string,
    thumbnailURL: string
  ) {
    const roomId = this.rooms.find((room) => channelId === room.id);
    if (roomId) {
      this.roomService
        .addRoomMembers(channelId, this.uid, this.avatarId)
        .then(() => {
          this.router.navigateByUrl(`/room/${channelId}`);
        })
        .then(() => {
          this.snackber.open('入室しました！');
        });
      this.roomService.updateRoomMemberIsActive(channelId);
    } else {
      this.roomService.createRoom(channelId, title, description, thumbnailURL);
      this.roomService
        .addRoomMembers(channelId, this.uid, this.avatarId)
        .then(() => {
          this.router.navigateByUrl(`/room/${channelId}`).then(() => {
            this.snackber.open('ルームを作成しました！');
          });
        });
    }
  }
}
