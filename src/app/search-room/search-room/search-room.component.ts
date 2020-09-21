import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.scss']
})
export class SearchRoomComponent implements OnInit {
  @Input() searchText: '';

  constructor(private router: Router) { }

  searchRoom() {
    this.router.navigate(['search-room', this.searchText]);
  }

  ngOnInit(): void {
  }

}
