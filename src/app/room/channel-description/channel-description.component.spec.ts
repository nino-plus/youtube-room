import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelDescriptionComponent } from './channel-description.component';

describe('ChannelDescriptionComponent', () => {
  let component: ChannelDescriptionComponent;
  let fixture: ComponentFixture<ChannelDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
