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

  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  googleLogin() {
    this.authService
      .googlelogin()
      .then(() => this.router.navigateByUrl('/top'));
  }

  twitterLogin() {
    this.authService
      .twitterlogin()
      .then(() => this.router.navigateByUrl('/top'));
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
