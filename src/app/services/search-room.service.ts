import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchRoomService {
  constructor(private http: HttpClient) {}

  getChannelItems(q: string) {
    return this.http
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: new HttpParams({
          fromObject: {
            part: 'snippet',
            key: 'AIzaSyAXIsSqQseq-O5cFLi-m9522BgokfvUYTU',
            maxResults: '20',
            type: 'channel',
            order: 'viewCount',
            q,
          },
        }),
      })
      .pipe(take(1))
      .toPromise();
  }
}
