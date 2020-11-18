import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCrossCircleComponent } from './icon-cross-circle.component';

describe('IconCrossCircleComponent', () => {
  let component: IconCrossCircleComponent;
  let fixture: ComponentFixture<IconCrossCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCrossCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCrossCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
