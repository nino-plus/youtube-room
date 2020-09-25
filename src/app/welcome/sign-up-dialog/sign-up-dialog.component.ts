import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<SignUpDialogComponent>
  ) {}

  ngOnInit(): void {}

  anonymouslyLogin() {
    this.authService.anonymouslylogin().then(() => {
      this.router.navigateByUrl('/top/create');
      this.dialogRef.close();
    });
  }

  googleSignUp() {
    this.authService.googlelogin().then(() => {
      this.router.navigateByUrl('/top/create');
      this.dialogRef.close();
    });
  }

  twitterSignUp() {
    this.authService.twitterlogin().then(() => {
      this.router.navigateByUrl('/top/create');
      this.dialogRef.close();
    });
  }
}
