import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/interfaces/room';

@Component({
  selector: 'app-channel-description',
  templateUrl: './channel-description.component.html',
  styleUrls: ['./channel-description.component.scss']
})
export class ChannelDescriptionComponent implements OnInit {
  @Input() room$: Observable<Room>;

  constructor() { }

  ngOnInit(): void {
  }

}
