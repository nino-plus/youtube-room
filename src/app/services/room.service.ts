import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from '../interfaces/member';
import { Room } from '../interfaces/room';
import { Video } from '../interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
  ) { }

  createRoom(id: string, title: string): Promise<void> {
    const value: Omit<Room, 'videoCount'> = {
      id,
      title,
      initialAction: false,
    };
    return this.db.doc(`rooms/${id}`).set(value);
  }

  addRoomMembers(channelId: string, uid: string) {
    const value: Member = {
      uid,
      active: true,
      lastStatusChecked: firestore.Timestamp.now(),
      lastPosted: firestore.Timestamp.now()
    };
    return this.db.doc(`rooms/${channelId}/members/${uid}`).set(value);
  }

  getMembers(channelId: string): Observable<Member[]> {
    return this.db
      .doc(`rooms/${channelId}`)
      .collection<Member>('members').valueChanges();
    }

  getRooms(): Observable<Room[]>{
    return this.db.collection<Room>('rooms').valueChanges();
  }

  getChannelVideos(channelId: string) {
    return this.http
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: new HttpParams({
          fromObject: {
            part: 'snippet',
            key: 'AIzaSyDpo9fQ3cNDd1CbowNBaWRx57MwhfHucVY',
            maxResults: '10',
            type: 'video',
            order: 'viewCount',
            channelId,
          },
        }),
      })
      .pipe(take(1))
      .toPromise();
  }

  setChannelFirstVideos(channelId: string, video: Video): Promise<void> {
    return this.db
    .doc(`rooms/${channelId}/videos/${video.videoId}`).set(video);
  }
}
