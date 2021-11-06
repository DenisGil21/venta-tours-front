import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotpagefoundComponent } from './notpagefound.component';

describe('NotpagefoundComponent', () => {
  let component: NotpagefoundComponent;
  let fixture: ComponentFixture<NotpagefoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotpagefoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotpagefoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
