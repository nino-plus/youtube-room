import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
export class RoomComponent implements OnInit {
  player: YT.Player;
  id = 'ZMXYcxEhy7w';
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
  user$: Observable<UserData> = this.authService.user$;
  messages = {};
  message$: Observable<Message[]> = this.chatService.getLatestMessages('UCUPq5dKFGnOziaqYI-ejYcg');
  members$: Observable<Member[]> = this.roomService.getMembers('UCUPq5dKFGnOziaqYI-ejYcg');
  form = this.fb.group({
    comments: ['', Validators.required],
  });

  private uid = this.authService.uid;
  private channelId = this.route.snapshot.paramMap.get('id');
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private chatService: ChatsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.chatService.getLatestMessages('UCUPq5dKFGnOziaqYI-ejYcg').pipe(skip(1)).subscribe(messages => {
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
      })
    );
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

  sendMessage() {
    this.chatService.sendMessage(
      'UCUPq5dKFGnOziaqYI-ejYcg',
      this.uid,
      this.form.value.comments
    );
    this.form.reset();
  }
}
