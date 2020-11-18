import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAccountCircleComponent } from './icon-account-circle.component';

describe('IconAccountCircleComponent', () => {
  let component: IconAccountCircleComponent;
  let fixture: ComponentFixture<IconAccountCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAccountCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAccountCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
