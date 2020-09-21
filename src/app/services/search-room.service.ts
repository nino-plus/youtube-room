import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchRoomService {

  constructor(private http: HttpClient) { }

  getPlaylistItems(q: string) {
    return this.http
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: new HttpParams({
          fromObject: {
            part: 'snippet',
            key: 'AIzaSyAWYnBGlY9DWRuvR52ex_6E9PJDlLKEOBw',
            maxResults: '50',
            type: 'channel',
            q
          },
        }),
      });
  }
}
