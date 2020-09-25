import { newArray } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { parse, toSeconds } from 'iso8601-duration';
import { Observable, Subscription } from 'rxjs';
import { map, skip } from 'rxjs/operators';
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
  id: string;
  videoTime: number;
  videoCount: number;

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

  async ngOnInit(): Promise<void> {
    this.subscriptions.add(
      this.authService.user$.subscribe((user) => {
        this.uid = user.uid;
        this.userName = user.userName;
      })
    );

    await this.setFirstVideo();

    // setInterval(async () => {
    //   const seekTime = Math.round(this.player.getCurrentTime());
    //   console.log(seekTime);
    //   if (this.videoTime - seekTime <= 10) {
    //     const randomNumber = Math.floor(Math.random() * this.videoCount);
    //     this.roomService.setNextVideo(this.channelId, randomNumber).subscribe(async (video) => {
    //       this.id = video.videoId;
    //       console.log(video.videoId);
    //       console.log(this.id);
    //       await this.roomService.getVideoItem(video.videoId).then((id) => {
    //         this.videoTime = toSeconds(parse(Object.values(id)[2][0].contentDetails.duration));
    //       });
    //     });
    //   }
    // }, 100000000000);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setVideo() {
    this.subscriptions.add(
      this.roomService.getRoom(this.channelId).subscribe((count) => {
        this.videoCount = count.videoCount;
      })
    );
  }

  async setFirstVideo() {
    this.subscriptions.add(
      this.roomService.getRoom(this.channelId).subscribe((count) => {
        this.videoCount = count.videoCount;
        const randomNumber = Math.floor(Math.random() * this.videoCount);
        this.roomService.getRandomVideoId(this.channelId, randomNumber).subscribe(async (video) => {
          console.log(video);
          this.id = video.videoId;
          await this.roomService.getVideoItem(video.videoId).then((id) => {
            this.videoTime = toSeconds(parse(Object.values(id)[2][0].contentDetails.duration));
            console.log(this.videoTime);
          });
        });
      })
    );
  }

  test() {
    const seekTime = Math.round(this.player.getCurrentTime());
    console.log(seekTime);
    if (this.videoTime - seekTime <= 10) {
      const randomNumber = Math.floor(Math.random() * this.videoCount);
      this.roomService.getRandomVideoId(this.channelId, randomNumber).subscribe(async (video) => {
        this.id = null;
        this.id = video.videoId;
        console.log(video.videoId);
        console.log(this.id);
        await this.roomService.getVideoItem(video.videoId).then((id) => {
          this.videoTime = toSeconds(parse(Object.values(id)[2][0].contentDetails.duration));
        });
      });
    }
  }

  savePlayer(player) {
    this.player = player;
  }

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
    console.log(response);
    await items.forEach(item => {
      this.videoIds.push(item.id.videoId);
    });
    const id = await this.roomService.getVideoItem('ygVnnLZ9qy8');
    console.log(toSeconds(parse(Object.values(id)[2][0].contentDetails.duration)));
  }
  getCurrentTime() {
    const time = Math.round(this.player.getCurrentTime());
    console.log(time.toString());
  }
}
