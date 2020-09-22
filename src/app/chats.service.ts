import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from './interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private db: AngularFirestore,
  ) { }

  sendMessage(cannelId: string, uid: string, comments: string): Promise<void> {
    const id = this.db.createId();
    const newValue: Message = {
      uid,
      comments,
      createdAt: firestore.Timestamp.now()
    };
    console.log(cannelId);
    console.log(uid);
    console.log(comments);
    return this.db.doc<Message>(`rooms/${cannelId}/messages/${id}`).set(newValue);
  }

  getLatestMessages(cannelId: string): Observable<Message[]> {
    return this.db
      .doc(`rooms/${cannelId}`)
      .collection<Message>('messages', ref => ref.orderBy('createdAt', 'desc').limit(1))
      .valueChanges();
  }
}
