import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ChatsService } from '../chats.service';
import { Message } from '../interfaces/message';
import { UserData } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  messages = {};
  message$: Observable<Message[]> = this.chatService.getLatestMessages('UCUPq5dKFGnOziaqYI-ejYcg');
  form = this.fb.group({
    comments: ['', Validators.required]
  });
  user$: Observable<UserData> = this.authService.user$;

  private uid = this.authService.uid;
  private channelId = this.route.snapshot.paramMap.get('id');
  private subscriptions: Subscription = new Subscription();

  constructor(
    public roomService: RoomService,
    private fb: FormBuilder,
    public authService: AuthService,
    public chatService: ChatsService,
    private route: ActivatedRoute,
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

  sendMessage() {
    this.chatService.sendMessage(
      'UCUPq5dKFGnOziaqYI-ejYcg',
      this.uid,
      this.form.value.comments
    );
    this.form.reset();
  }
}
