import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendsCircleComponent } from './legends-circle.component';

describe('LegendsCircleComponent', () => {
  let component: LegendsCircleComponent;
  let fixture: ComponentFixture<LegendsCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendsCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendsCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
