import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArrowUpGreenComponent } from './icon-arrow-up-green.component';

describe('IconArrowUpGreenComponent', () => {
  let component: IconArrowUpGreenComponent;
  let fixture: ComponentFixture<IconArrowUpGreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconArrowUpGreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconArrowUpGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
