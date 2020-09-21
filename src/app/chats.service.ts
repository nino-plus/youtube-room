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

  sendMessage(cannelId: string, uid: string, comments: string) {
    const id = this.db.createId;
    return this.db.doc(`rooms/${cannelId}/messages/${id}`).set({
      uid,
      comments,
      createdAt: firestore.Timestamp.now()
    });
  }

  getLatestMessages(cannelId: string): Observable<Message> {
    return this.db
    .collection<Message>(`rooms/${cannelId}/messages/`, ref => ref.orderBy('createdAt', 'desc').limit(1))
    .valueChanges().pipe(
      map(docs => docs && docs[0])
    );
  }

  getChatsColumnMessages(cannelId: string, uid: string, comments: string) {
    return this.db.collection(`rooms/${cannelId}/messages/`).add({
      uid,
      comments
    });
  }
}
