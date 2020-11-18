import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInstrumentTypeReferenceComponent } from './footer-instrument-type-reference.component';

describe('FooterInstrumentTypeReferenceComponent', () => {
  let component: FooterInstrumentTypeReferenceComponent;
  let fixture: ComponentFixture<FooterInstrumentTypeReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterInstrumentTypeReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterInstrumentTypeReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
