import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRadioCheckedComponent } from './icon-radio-checked.component';

describe('IconRadioCheckedComponent', () => {
  let component: IconRadioCheckedComponent;
  let fixture: ComponentFixture<IconRadioCheckedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconRadioCheckedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconRadioCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
