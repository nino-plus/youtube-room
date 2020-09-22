import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Member } from '../interfaces/member';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private db: AngularFirestore,
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

  getMembers(cannelId: string): Observable<Member[]> {
    return this.db
      .doc(`rooms/${cannelId}`)
      .collection<Member>('members').valueChanges();
    }

  getRooms(): Observable<Room[]>{
    return this.db.collection<Room>('rooms').valueChanges();
  }
}
