import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAssignComponent } from './icon-assign.component';

describe('IconAssignComponent', () => {
  let component: IconAssignComponent;
  let fixture: ComponentFixture<IconAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
