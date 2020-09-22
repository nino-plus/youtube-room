import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  async createUser(
    uid: string,
    userName: string,
    avatarId: number
  ): Promise<void> {
    const userData: UserData = {
      uid,
      userName,
      avatarId,
    };
    return await this.db
      .doc<UserData>(`users/${uid}`)
      .set(userData, { merge: true });
  }

  getUserData(uid: string): Observable<UserData> {
    return this.db.doc<UserData>(`users/${uid}`).valueChanges();
  }
}
