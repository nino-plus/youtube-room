import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchRoomService } from 'src/app/services/search-room.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-result-room',
  templateUrl: './result-room.component.html',
  styleUrls: ['./result-room.component.scss']
})
export class ResultRoomComponent implements OnInit, OnDestroy {
  resultRoom: [];
  searchText: string;
  routePramMap = this.route.paramMap;
  subscriptions: Subscription;

  constructor(
    private route: ActivatedRoute,
    private searchRoomService: SearchRoomService
  ) {}

  ngOnInit() {
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
