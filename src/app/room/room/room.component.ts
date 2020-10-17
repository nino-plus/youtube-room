import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { bounce, fade, float } from 'src/app/animations';
import { ChatsService } from 'src/app/chats.service';
import { Member } from 'src/app/interfaces/member';
import { Message } from 'src/app/interfaces/message';
import { Room } from 'src/app/interfaces/room';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [fade, bounce, float],
})
export class RoomComponent implements OnInit, OnDestroy {

  readonly channelId = this.route.snapshot.paramMap.get('id');
  readonly messages = {};
  readonly members$: Observable<Member[]> = this.roomService.getMembers(this.channelId);
  readonly allMessages$: Observable<Message[]> = this.chatsService.getAllMessages(
    this.channelId
  );
  room$: Observable<Room> = this.roomService.getRoom(this.channelId);
  member: Member;
  videoCount: number;

  private uid = this.authService.uid;
  private readonly subscriptions: Subscription = new Subscription();
  private member$: Observable<Member> = this.roomService.getMember(
    this.channelId,
    this.uid
  );

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private chatsService: ChatsService,
    private route: ActivatedRoute,
    public loadingService: LoadingService,
    private router: Router
  ) {
    this.subscriptions.add(this.chatsService
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
      }));

    this.loadingService.loading = true;

    this.subscriptions.add(this.member$.subscribe((member) => {
      this.member = member;
    }));
  }

  ngOnInit(): void {
    this.setVideo();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async setVideo() {
    this.subscriptions.add(
      this.roomService.getRoom(this.channelId).subscribe((count) => {
        this.videoCount = count.allVideosCount;
        const randomNumber = Math.floor(Math.random() * this.videoCount);
        this.roomService
          .getRandomVideoId(this.channelId, randomNumber)
          .subscribe(async (video) => {
            if (video.videoId) {
              await this.roomService.setPlayVideo(this.channelId, video.videoId);
            }
            return;
          });
      })
    );
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/');
    });
    this.roomService.updateRoomMemberIsNotActive(this.channelId);
  }

  exitRoom() {
    this.roomService.updateRoomMemberIsNotActive(this.channelId);
  }
}
