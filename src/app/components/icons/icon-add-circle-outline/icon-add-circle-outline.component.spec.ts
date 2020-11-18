import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAddCircleOutlineComponent } from './icon-add-circle-outline.component';

describe('IconAddCircleOutlineComponent', () => {
  let component: IconAddCircleOutlineComponent;
  let fixture: ComponentFixture<IconAddCircleOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAddCircleOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAddCircleOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
