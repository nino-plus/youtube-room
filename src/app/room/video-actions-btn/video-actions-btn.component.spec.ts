import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoActionsBtnComponent } from './video-actions-btn.component';

describe('VideoActionsBtnComponent', () => {
  let component: VideoActionsBtnComponent;
  let fixture: ComponentFixture<VideoActionsBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoActionsBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoActionsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
