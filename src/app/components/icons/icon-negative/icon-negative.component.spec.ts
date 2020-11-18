import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconNegativeComponent } from './icon-negative.component';

describe('IconNegativeComponent', () => {
  let component: IconNegativeComponent;
  let fixture: ComponentFixture<IconNegativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconNegativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconNegativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
