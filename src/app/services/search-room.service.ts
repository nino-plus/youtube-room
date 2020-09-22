import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchRoomService {
  constructor(private http: HttpClient) {}

  getPlayListItems(q: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search', {
      params: new HttpParams({
        fromObject: {
          part: 'snippet',
          key: 'AIzaSyDpo9fQ3cNDd1CbowNBaWRx57MwhfHucVY',
          maxResults: '20',
          type: 'channel',
          q,
        },
      }),
    });
  }
}
