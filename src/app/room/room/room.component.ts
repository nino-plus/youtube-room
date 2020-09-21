import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { bounce, fade } from 'src/app/animations';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

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

  users$: Observable<UserData> = this.authService.user$;

  commentForm = new FormControl('', [
    Validators.maxLength(140),
    Validators.required,
  ]);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {}

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  addComment() {}

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
}
