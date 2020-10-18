import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { bounce, fade, float } from 'src/app/animations';
import { Member } from 'src/app/interfaces/member';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-premier-users',
  templateUrl: './premier-users.component.html',
  styleUrls: ['./premier-users.component.scss'],
  animations: [fade, bounce, float],
})
export class PremierUsersComponent implements OnInit {
  @Input() members$: Observable<Member[]>;
  @Input() messages: Message[];

  constructor() { }

  ngOnInit(): void {
  }

}
