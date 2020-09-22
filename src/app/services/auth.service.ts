import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { UserData } from '../interfaces/user';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.user;
  uid: string;
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
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this.user$.subscribe((user) => {
      this.uid = user.uid;
    });
  }

  async anonymouslylogin(): Promise<void> {
    return await this.afAuth.signInAnonymously().then(() => {
      this.snackBar.open('ログインしました。', '閉じる');
    })
      .catch((error) => {
        console.error(error.message);
        this.snackBar.open(
          'ログインエラーです。数秒後にもう一度お試しください。',
          '閉じる'
        );
      });
  }

  async twitterlogin(): Promise<void> {
    const provider = new auth.TwitterAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return await this.afAuth.signInWithPopup(provider).then(() => {
      this.snackBar.open('ログインしました。', '閉じる');
    })
      .catch((error) => {
        console.error(error.message);
        this.snackBar.open(
          'ログインエラーです。数秒後にもう一度お試しください。',
          '閉じる'
        );
      });
  }

  async googlelogin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return await this.afAuth.signInWithPopup(provider).then(() => {
      this.snackBar.open('ログインしました。', '閉じる');
    })
      .catch((error) => {
        console.error(error.message);
        this.snackBar.open(
          'ログインエラーです。数秒後にもう一度お試しください。',
          '閉じる'
        );
      });
  }

  async logout(): Promise<void> {
    return await this.afAuth
      .signOut()
      .then(() => {
        this.snackBar.open('ログアウトしました。', '閉じる');
      })
      .catch((error) => {
        console.error(error.message);
        this.snackBar.open(
          'ログアウトエラーです。数秒後にもう一度お試しください。',
          '閉じる'
        );
      });
  }
}
