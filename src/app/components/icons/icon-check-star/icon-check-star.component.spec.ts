import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCheckStarComponent } from './icon-check-star.component';

describe('IconCheckStarComponent', () => {
  let component: IconCheckStarComponent;
  let fixture: ComponentFixture<IconCheckStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCheckStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCheckStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
