import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultRoomComponent } from './result-room.component';

describe('ResultRoomComponent', () => {
  let component: ResultRoomComponent;
  let fixture: ComponentFixture<ResultRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
