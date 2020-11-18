import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBigChevronDownComponent } from './icon-big-chevron-down.component';

describe('IconBigChevronDownComponent', () => {
  let component: IconBigChevronDownComponent;
  let fixture: ComponentFixture<IconBigChevronDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconBigChevronDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBigChevronDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
