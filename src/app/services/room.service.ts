import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { Member } from '../interfaces/member';
import { Room } from '../interfaces/room';
import { UserData } from '../interfaces/user';
import { Video } from '../interfaces/video';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  uid: string;
  userName: string;

  user$: Observable<UserData> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        this.uid = afUser && afUser.uid;
        return this.userService.getUserData(afUser.uid);
      } else {
        return of(null);
      }
    }),
    shareReplay(1)
  );

  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.user$.subscribe((user) => {
      this.uid = user?.uid;
      this.userName = user?.userName;
    });
  }

  createRoom(id: string, title: string): Promise<void> {
    const value: Omit<Room, 'videoCount'> = {
      id,
      title,
      initialAction: false,
    };
    return this.db.doc(`rooms/${id}`).set(value);
  }

  addRoomMembers(channelId: string, uid: string, avatarId: number) {
    const value: Member = {
      uid,
      avatarId,
      isActive: true,
      lastStatusChecked: firestore.Timestamp.now(),
      lastPosted: firestore.Timestamp.now(),
      name: this.userName,
    };
    return this.db.doc(`rooms/${channelId}/members/${uid}`).set(value);
  }

  getMembers(channelId: string): Observable<Member[]> {
    return this.db
      .doc(`rooms/${channelId}`)
      .collection<Member>('members')
      .valueChanges();
  }

  getMember(channelId: string, uid: string): Observable<Member> {
    return this.db
      .doc<Member>(`rooms/${channelId}/member/${uid}`)
      .valueChanges();
  }

  getRooms(): Observable<Room[]> {
    return this.db.collection<Room>('rooms').valueChanges();
  }

  getRoom(channelId: string): Observable<Room> {
    return this.db.doc<Room>(`rooms/${channelId}`).valueChanges();
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
    return this.db.doc(`rooms/${channelId}/videos/${video.videoId}`).set(video);
  }
}
