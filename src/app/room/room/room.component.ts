import { newArray } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { bounce, fade, float } from 'src/app/animations';
import { ChatsService } from 'src/app/chats.service';
import { Member } from 'src/app/interfaces/member';
import { Message } from 'src/app/interfaces/message';
import { Room } from 'src/app/interfaces/room';
import { UserData } from 'src/app/interfaces/user';
import { Video } from 'src/app/interfaces/video';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [fade, bounce, float],
})
export class RoomComponent implements OnInit, OnDestroy {
  private uid = this.authService.uid;
  private userName = this.authService.userName;
  private avatarId: number;
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
  member: Member;
  isActive: boolean;

  allMessages$: Observable<Message[]> = this.chatsService.getAllMessages(
    this.channelId
  );

  members$: Observable<Member[]> = this.roomService.getMembers(this.channelId);

  member$: Observable<Member> = this.roomService.getMember(
    this.channelId,
    this.uid
  );

  user$: Observable<UserData> = this.authService.user$;

  message$: Observable<Message[]> = this.chatsService.getLatestMessages(
    this.channelId
  );

  room$: Observable<Room> = this.roomService.getRoom(this.channelId);

  firstVideos: any;
  videoIds = [];
  id: string;
  videoTime: number;
  videoCount: number;
  videoId$: Observable<Video> = this.roomService.getPlayVideo(this.channelId);

  form = this.fb.group({
    comments: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private chatsService: ChatsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
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

    this.member$.subscribe((member) => {
      this.member = member;
    });
  }

  async ngOnInit(): Promise<void> {
    this.subscriptions.add(
      this.authService.user$.subscribe((user) => {
        this.uid = user?.uid;
        this.userName = user?.userName;
        this.avatarId = user?.avatarId;
      })
    );

    // await this.setVideo();

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

  setVideoLoop() {
    this.videoId$.subscribe((doc) => {
      this.player.loadVideoById(doc?.videoId);
    });
  }

  async setVideo() {
    this.subscriptions.add(
      this.roomService.getRoom(this.channelId).subscribe((count) => {
        console.log(count);
        this.videoCount = count.allVideosCount;
        const randomNumber = Math.floor(Math.random() * this.videoCount);
        this.roomService
          .getRandomVideoId(this.channelId, randomNumber)
          .subscribe(async (video) => {
            await this.roomService.setPlayVideo(this.channelId, video.videoId);
          });
      })
    );
    this.videoId$.subscribe((doc) => {
      this.player.loadVideoById(doc?.videoId);
    });
  }

  savePlayer(player) {
    this.player = player;
    this.player.playVideo();
    this.player.mute();
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

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/welcome');
    });
    this.roomService.updateRoomMemberIsActive(this.channelId);
  }

  exitRoom() {
    this.roomService.updateRoomMemberIsActive(this.channelId);
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
