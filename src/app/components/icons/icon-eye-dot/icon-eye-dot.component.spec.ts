import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEyeDotComponent } from './icon-eye-dot.component';

describe('IconEyeDotComponent', () => {
  let component: IconEyeDotComponent;
  let fixture: ComponentFixture<IconEyeDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconEyeDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconEyeDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
