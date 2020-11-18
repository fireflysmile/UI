import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAddCircleComponent } from './icon-add-circle.component';

describe('IconAddCircleComponent', () => {
  let component: IconAddCircleComponent;
  let fixture: ComponentFixture<IconAddCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAddCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAddCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
