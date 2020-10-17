import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-video-actions-btn',
  templateUrl: './video-actions-btn.component.html',
  styleUrls: ['./video-actions-btn.component.scss'],
  animations: [fade],
})
export class VideoActionsBtnComponent implements OnInit {

  isGood: boolean;
  isBad: boolean;
  isCry: boolean;
  isLagh: boolean;
  isSuprise: boolean;

  constructor() { }

  ngOnInit(): void {
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
}
