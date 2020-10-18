import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Message } from './interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private db: AngularFirestore,
  ) { }

  sendMessage(channelId: string, comments: string, uid: string, userName: string, avatarId: number): Promise<void> {
    const id = this.db.createId();
    const newValue: Message = {
      uid,
      avatarId,
      comments,
      userName,
      createdAt: firestore.Timestamp.now()
    };
    return this.db.doc<Message>(`rooms/${channelId}/messages/${id}`).set(newValue);
  }

  getLatestMessages(channelId: string): Observable<Message[]> {
    return this.db
      .doc(`rooms/${channelId}`)
      .collection<Message>('messages', ref => ref.orderBy('createdAt', 'desc').limit(1))
      .valueChanges();
  }

  getAllMessages(cannelId: string): Observable<Message[]> {
    return this.db
      .doc(`rooms/${cannelId}`)
      .collection<Message>('messages', ref => ref.orderBy('createdAt', 'desc').limit(50))
      .valueChanges();
  }
}
