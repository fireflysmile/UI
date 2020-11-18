import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRadioUncheckedComponent } from './icon-radio-unchecked.component';

describe('IconRadioUncheckedComponent', () => {
  let component: IconRadioUncheckedComponent;
  let fixture: ComponentFixture<IconRadioUncheckedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconRadioUncheckedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconRadioUncheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
