import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcessCollateralDetailsPageComponent } from './excess-collateral-details-page.component';

describe('ExcessCollateralDetailsPageComponent', () => {
  let component: ExcessCollateralDetailsPageComponent;
  let fixture: ComponentFixture<ExcessCollateralDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcessCollateralDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcessCollateralDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
