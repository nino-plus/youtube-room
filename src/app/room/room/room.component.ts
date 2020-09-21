import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  player: YT.Player;
  id = 'ZMXYcxEhy7w';
  playerVars = {
    controls: 0,
  };
  isProcessing: boolean;
  items = newArray(4);

  user$: Observable<User>;

  commentForm = new FormControl('', [
    Validators.maxLength(140),
    Validators.required,
  ]);

  constructor() {}

  ngOnInit(): void {}

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  submit() {}
}
