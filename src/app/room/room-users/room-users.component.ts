import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { bounce, fade, float } from 'src/app/animations';
import { Member } from 'src/app/interfaces/member';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-room-users',
  templateUrl: './room-users.component.html',
  styleUrls: ['./room-users.component.scss'],
  animations: [fade, bounce, float],
})
export class RoomUsersComponent implements OnInit {
  @Input() members$: Observable<Member[]>;
  @Input() messages: Message[];
  constructor() { }

  ngOnInit(): void {
  }

}
