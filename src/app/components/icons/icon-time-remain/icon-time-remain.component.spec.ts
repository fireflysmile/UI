import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTimeRemainComponent } from './icon-time-remain.component';

describe('IconTimeRemainComponent', () => {
  let component: IconTimeRemainComponent;
  let fixture: ComponentFixture<IconTimeRemainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconTimeRemainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTimeRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
