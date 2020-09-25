import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  avatarIds = [...Array(12)].map((_, i) => i + 1);
  config: SwiperConfigInterface = {
    loop: true,
    observer: true,
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

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

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
    const userName = this.form.value.name;
    const avatarId = this.selectedId + 1;
    console.log('check');
    console.log(this.selectedId);
    console.log(this.uid);
    console.log(userName);

    this.userService
      .createUser(this.uid, userName, avatarId)
      .then(() => this.router.navigateByUrl('/top'));
  }
}
