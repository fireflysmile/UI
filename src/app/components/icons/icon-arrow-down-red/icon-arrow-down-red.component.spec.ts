import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArrowDownRedComponent } from './icon-arrow-down-red.component';

describe('IconArrowDownRedComponent', () => {
  let component: IconArrowDownRedComponent;
  let fixture: ComponentFixture<IconArrowDownRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconArrowDownRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconArrowDownRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
