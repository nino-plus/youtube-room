import { newArray } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { bounce, fade } from 'src/app/animations';
import { ChatsService } from 'src/app/chats.service';
import { Member } from 'src/app/interfaces/member';
import { Message } from 'src/app/interfaces/message';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [fade, bounce],
})
export class RoomComponent implements OnInit, OnDestroy {
  private uid = this.authService.uid;
  private userName = this.authService.userName;
  private avatarId = this.authService.avatarId;
  private channelId = this.route.snapshot.paramMap.get('id');
  private subscriptions: Subscription = new Subscription();
  player: YT.Player;
  playerVars = {
    controls: 0,
  };
  isProcessing: boolean;
  items = newArray(4);
  users = newArray(20);
  isGood: boolean;
  isBad: boolean;
  isCry: boolean;
  isLagh: boolean;
  isSuprise: boolean;
  messages = {};
  allMessages$: Observable<Message[]> = this.chatsService.getAllMessages(
    this.channelId
  );
  members$: Observable<Member[]> = this.roomService.getMembers(
    this.channelId
  );
  form = this.fb.group({
    comments: ['', Validators.required],
  });
  user$: Observable<UserData> = this.authService.user$;
  message$: Observable<Message[]> = this.chatsService.getLatestMessages(this.channelId);
  firstVideos: any;
  videoIds = [];
  id;

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private chatsService: ChatsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.chatsService
      .getLatestMessages(this.channelId)
      .pipe(skip(1))
      .subscribe((messages) => {
        if (!messages[0]) {
          return;
        }
        const message = messages[0];
        if (!this.messages[message.uid]) {
          this.messages[message.uid] = [];
        }
        this.messages[message.uid].unshift(message.comments);
        setTimeout(() => {
          this.messages[message.uid].pop();
        }, 5000);
      });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.user$.subscribe((user) => {
        this.uid = user.uid;
        this.userName = user.userName;
      })
    );
    // this.setChannelFirstVideos().then(() => {
    //   for (let i = this.videoIds.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random)
    //   }
    //   // this.videoIds.forEach((videoid) => {
    //   //   setTimeout(this.id = videoid, 5000);
    //   // });
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  savePlayer(player) {
    this.player = player;
  }

  addComment() { }

  good() {
    this.isGood = !this.isGood;
  }

  bad() {
    this.isBad = !this.isBad;
  }

  cry() {
    this.isCry = !this.isCry;
  }

  lagh() {
    this.isLagh = !this.isLagh;
  }

  surprise() {
    this.isSuprise = !this.isSuprise;
  }

  logOut() {
    this.authService.logout();
  }

  sendMessage() {
    this.chatsService.sendMessage(
      this.channelId,
      this.form.value.comments,
      this.uid,
      this.userName,
      this.avatarId,
    );
    this.form.reset();
  }

  async setChannelFirstVideos() {
    const response: any = await this.roomService.getChannelVideos(this.channelId);
    const items = response.items;
    await items.forEach(item => {
      this.videoIds.push(item.id.videoId);
    });
  }
}
