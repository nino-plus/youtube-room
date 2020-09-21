import { TestBed } from '@angular/core/testing';

import { SearchRoomService } from './search-room.service';

describe('SearchRoomService', () => {
  let service: SearchRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
