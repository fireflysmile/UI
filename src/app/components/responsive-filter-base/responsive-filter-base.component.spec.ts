import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveFilterBaseComponent } from './responsive-filter-base.component';

describe('ResponsiveFilterBaseComponent', () => {
  let component: ResponsiveFilterBaseComponent;
  let fixture: ComponentFixture<ResponsiveFilterBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsiveFilterBaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveFilterBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.inputWidth = 100;
    expect(component).toBeTruthy();
  });

  it('should set input width', () => {
    component.inputWidth = 100;
    expect(component.inputWidth).toEqual(100);
  });
});
