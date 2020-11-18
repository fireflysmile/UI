import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateralValueAnalysisComponent } from './collateral-value-analysis.component';

describe('CollateralValueAnalysisComponent', () => {
  let component: CollateralValueAnalysisComponent;
  let fixture: ComponentFixture<CollateralValueAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollateralValueAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollateralValueAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
