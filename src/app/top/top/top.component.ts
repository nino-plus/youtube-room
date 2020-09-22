import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { SearchRoomService } from 'src/app/services/search-room.service';
import { RoomData } from 'src/app/interfaces/room-data';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public resultRoom: RoomData[];

  avatarIds = [...Array(10)].map((_, i) => i + 1);
  config: SwiperConfigInterface = {
    loop: true,
    navigation: true,
    pagination: {
      el: '.pager',
      clickable: true,
    },
    centeredSlides: true,
    slidesPerView: 3,
  };
  selectedId = 1;

  user$: Observable<UserData> = this.authService.user$;
  uid: string;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
  });

  searchTextForm = new FormControl('');

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  @Input() searchText: '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private searchRoomService: SearchRoomService
  ) {}

  async searchRoom() {
    const channelItems = await this.searchRoomService.getChannelItems(
      this.searchTextForm.value
    );

    const channelDatas = Object.values(channelItems);

    console.log(channelDatas);

    channelDatas[5].items.map((data) => {});
  }

  ngOnInit(): void {
    this.user$
      .pipe(
        map((user) => {
          return user?.uid;
        })
      )
      .subscribe((uid) => {
        this.uid = uid;
      });
  }

  submit() {
    const userName = this.form.value;
    const avatarId = this.selectedId;
    this.userService.createUser(this.uid, userName, avatarId);
    console.log(this.uid);
    console.log(userName);
    console.log(avatarId);
  }
}
