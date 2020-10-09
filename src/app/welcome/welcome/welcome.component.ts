import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  nameForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  userAvatar: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.authService.user$.subscribe((user) => {
      this.userAvatar = user?.avatarId;
    });
  }

  ngOnInit(): void {}

  googleLogin() {
    this.authService.googlelogin().then(() => {
      if (this.userAvatar) {
        this.router.navigateByUrl('/top');
      } else {
        this.router.navigateByUrl('/top/create');
      }
    });
  }

  twitterLogin() {
    this.authService.twitterlogin().then(() => {
      if (this.userAvatar) {
        this.router.navigateByUrl('/top');
      } else {
        this.router.navigateByUrl('/top/create');
      }
    });
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
    });
  }

  anonymouslyLogin() {
    this.authService.anonymouslylogin().then(() => {
      this.router.navigateByUrl('/top/create');
    });
  }
}
