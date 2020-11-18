import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconChevronLeftComponent } from './icon-chevron-left.component';

describe('IconChevronLeftComponent', () => {
  let component: IconChevronLeftComponent;
  let fixture: ComponentFixture<IconChevronLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconChevronLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconChevronLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
