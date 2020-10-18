import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremierUsersComponent } from './premier-users.component';

describe('PremierUsersComponent', () => {
  let component: PremierUsersComponent;
  let fixture: ComponentFixture<PremierUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremierUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremierUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
