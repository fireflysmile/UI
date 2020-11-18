import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCheckCircleOutlineComponent } from './icon-check-circle-outline.component';

describe('IconCheckCircleOutlineComponent', () => {
  let component: IconCheckCircleOutlineComponent;
  let fixture: ComponentFixture<IconCheckCircleOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCheckCircleOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCheckCircleOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
