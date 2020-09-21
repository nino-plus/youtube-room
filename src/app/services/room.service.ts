import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
}
