import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomVideoComponent } from './room-video.component';

describe('RoomVideoComponent', () => {
  let component: RoomVideoComponent;
  let fixture: ComponentFixture<RoomVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
