import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  @Input() searchText: '';

  constructor(private router: Router) { }

  searchRoom() {
    this.router.navigate(['top', this.searchText]);
  }

  ngOnInit(): void {
  }

}
