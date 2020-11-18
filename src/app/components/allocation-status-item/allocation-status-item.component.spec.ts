import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationStatusItemComponent } from './allocation-status-item.component';

describe('AllocationStatusItemComponent', () => {
  let component: AllocationStatusItemComponent;
  let fixture: ComponentFixture<AllocationStatusItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationStatusItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationStatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
