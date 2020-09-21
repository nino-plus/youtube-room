import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchRoomService {

  constructor(private http: HttpClient) { }

  getPlayListItems(q: string) {
    return this.http
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: new HttpParams({
          fromObject: {
            part: 'snippet',
            key: 'AIzaSyAXIsSqQseq-O5cFLi-m9522BgokfvUYTU',
            maxResults: '50',
            type: 'channel',
            q
          },
        }),
      });
  }
}
