import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
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
  @Input() searchText: '';
  resultRoom: any;
  userName: string;
  user$: Observable<UserData> = this.authService.user$;
  uid: string;
  avatarId = this.authService.avatarId;
  avatarIdArray = [...Array(10)].map((_, i) => i + 1);
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


  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
  });

  searchTextForm = new FormControl('');

  get nameControl() {
    return this.form.get('name') as FormControl;
  }


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private searchRoomService: SearchRoomService,
    private snackbar: MatSnackBar
  ) { }

  async searchRoom() {
    const channelItems: any = await this.searchRoomService.getChannelItems(
      this.searchTextForm.value
    );
    if (channelItems.items.length === 0){
      this.snackbar.open('検索できませんでした');
    }
    console.log(channelItems.items);
    this.resultRoom = channelItems.items;
    console.log(this.resultRoom);

  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.uid = user?.uid;
      this.userName = user?.userName;
      this.avatarId = user?.avatarId;
    });
    console.log(this.avatarId);
  }

  submit() {
    const userName = this.form.value;
    const avatarId = this.selectedId;
    this.userService.createUser(this.uid, userName, avatarId);
  }
}
