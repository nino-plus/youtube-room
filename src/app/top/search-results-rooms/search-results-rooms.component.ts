import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchRoomService } from 'src/app/services/search-room.service';
import { switchMap, take } from 'rxjs/operators';
import { RoomData } from 'src/app/interfaces/room-data';
import { Room } from 'src/app/interfaces/room';

@Component({
  selector: 'app-search-results-rooms',
  templateUrl: './search-results-rooms.component.html',
  styleUrls: ['./search-results-rooms.component.scss']
})
export class SearchResultsRoomsComponent implements OnInit, OnDestroy {
  public resultRoom: RoomData[];
  public searchText: string;
  private routePramMap = this.route.paramMap;
  private subscriptions: Subscription;

  constructor(
    private route: ActivatedRoute,
    private searchRoomService: SearchRoomService
  ) {}

  ngOnInit(): void {
    this.subscriptions = this.routePramMap
      .pipe(
        switchMap(param => {
          this.searchText = param.get('searchText');
          return this.searchRoomService.getPlayListItems(this.searchText);
        })
      )
      .subscribe((datas: any) => {
        this.resultRoom = datas.items.map(data => data.snippet);
        console.log(this.resultRoom);
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
