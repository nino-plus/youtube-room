import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ChatsService } from 'src/app/chats.service';
import { Message } from 'src/app/interfaces/message';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {
  @Input() allMessages$: Observable<Message[]>;
  @Input() channelId: string;

  user$: Observable<UserData> = this.authService.user$;
  uid: string = this.authService.uid;
  userName: string;
  avatarId: number;
  form = this.fb.group({
    comments: ['', Validators.required],
  });

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private chatsService: ChatsService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.user$.subscribe((user) => {
        this.uid = user?.uid;
        this.userName = user?.userName;
        this.avatarId = user?.avatarId;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  sendMessage() {
    this.chatsService.sendMessage(
      this.channelId,
      this.form.value.comments,
      this.uid,
      this.userName,
      this.avatarId
    );
    this.form.reset();
  }
}
