import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchRoomService } from 'src/app/services/search-room.service';
import { switchMap } from 'rxjs/operators';
import { RoomService } from 'src/app/services/room.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search-results-rooms',
  templateUrl: './search-results-rooms.component.html',
  styleUrls: ['./search-results-rooms.component.scss']
})
export class SearchResultsRoomsComponent implements OnInit, OnDestroy {
  public resultRoom: [];
  public searchText: string;
  private routePramMap = this.route.paramMap;
  private subscriptions: Subscription = new Subscription();
  private uid = this.authService.uid;

  constructor(
    private route: ActivatedRoute,
    private searchRoomService: SearchRoomService,
    private roomService: RoomService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.routePramMap
      .pipe(
        switchMap(param => {
          this.searchText = param.get('searchText');
          return this.searchRoomService.getPlayListItems(this.searchText);
        })
      )
      .subscribe((datas: any) => {
        this.resultRoom = datas.items.map(data => data.snippet);
        console.log(this.resultRoom);
      })
    );

    this.subscriptions.add(
      this.authService.user$.subscribe((user) => {
        this.uid = user.uid;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createRoom() {
    this.roomService.createRoom('UCUPq5dKFGnOziaqYI-ejYcg', 'Nino/CAMP');
    this.roomService.addRoomMembers('UCUPq5dKFGnOziaqYI-ejYcg', this.uid);
  }
}
