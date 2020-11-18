import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconChevronRightComponent } from './icon-chevron-right.component';

describe('IconChevronRightComponent', () => {
  let component: IconChevronRightComponent;
  let fixture: ComponentFixture<IconChevronRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconChevronRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconChevronRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
