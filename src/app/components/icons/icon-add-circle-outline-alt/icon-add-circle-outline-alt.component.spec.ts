import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAddCircleOutlineAltComponent } from './icon-add-circle-outline-alt.component';

describe('IconAddCircleOutlineAltComponent', () => {
  let component: IconAddCircleOutlineAltComponent;
  let fixture: ComponentFixture<IconAddCircleOutlineAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAddCircleOutlineAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAddCircleOutlineAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
