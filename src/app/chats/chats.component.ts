import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from '../chats.service';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  messages = {};
  form = this.fb.group({
    comments: ['', Validators.required]
  });

  private uid = this.authService.uid;
  private channelId = this.route.snapshot.paramMap.get('id');

  constructor(
    public roomService: RoomService,
    private fb: FormBuilder,
    private authService: AuthService,
    private chatService: ChatsService,
    private route: ActivatedRoute,
  ) {
    // this.chatService.getLatestMessages(this.channelId).subscribe(messages => {
    //   if (!this.messages[messages.uid]) {
    //     this.messages[messages.comments] = [];
    //   }

    //   this.messages[messages.uid].unshift(messages.comments);
    // });
  }

  ngOnInit(): void {

  }
  sendMessage() {
    this.chatService.sendMessage(
      'UCUPq5dKFGnOziaqYI-ejYcg',
      this.uid,
      this.form.value.comments
    );
  }
}
