import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByInstrumentTypeComponent } from './by-instrument-type.component';

describe('ByInstrumentTypeComponent', () => {
  let component: ByInstrumentTypeComponent;
  let fixture: ComponentFixture<ByInstrumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByInstrumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByInstrumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
