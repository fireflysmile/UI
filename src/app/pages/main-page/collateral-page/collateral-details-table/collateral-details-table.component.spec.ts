import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateralDetailsTableComponent } from './collateral-details-table.component';

describe('CollateralDetailsTableComponent', () => {
  let component: CollateralDetailsTableComponent;
  let fixture: ComponentFixture<CollateralDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollateralDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollateralDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
