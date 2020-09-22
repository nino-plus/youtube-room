import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SearchRoomService } from 'src/app/services/search-room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  public resultRoom;

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
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private searchRoomService: SearchRoomService
  ) {}

  async searchRoom() {
    const channelItems: any = await this.searchRoomService.getChannelItems(
      this.searchTextForm.value
    );
    this.resultRoom = channelItems.items;
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
  }
}
