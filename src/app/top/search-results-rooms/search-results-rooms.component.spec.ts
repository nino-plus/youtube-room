import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsRoomsComponent } from './search-results-rooms.component';

describe('SearchResultsRoomsComponent', () => {
  let component: SearchResultsRoomsComponent;
  let fixture: ComponentFixture<SearchResultsRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
