import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { RoomData } from 'src/app/interfaces/room-data';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { SearchRoomService } from 'src/app/services/search-room.service';

@Component({
  selector: 'app-search-results-rooms',
  templateUrl: './search-results-rooms.component.html',
  styleUrls: ['./search-results-rooms.component.scss'],
})
export class SearchResultsRoomsComponent implements OnInit, OnDestroy {
  @Input() resultRoom: string;
  public searchText: string;
  private routePramMap = this.route.paramMap;
  private subscriptions: Subscription = new Subscription();
  private uid = this.authService.uid;

  constructor(
    private route: ActivatedRoute,
    private searchRoomService: SearchRoomService,
    private roomService: RoomService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.user$.subscribe((user) => {
        this.uid = user.uid;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createRoom(channelId: string, title: string) {
    this.roomService.createRoom(channelId, title);
    this.roomService.addRoomMembers(channelId, this.uid);
  }
}
