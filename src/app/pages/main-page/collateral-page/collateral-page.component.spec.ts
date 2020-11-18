import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateralPageComponent } from './collateral-page.component';

describe('CollateralPageComponent', () => {
  let component: CollateralPageComponent;
  let fixture: ComponentFixture<CollateralPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollateralPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollateralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
