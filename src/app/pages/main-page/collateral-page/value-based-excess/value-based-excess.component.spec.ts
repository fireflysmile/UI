import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueBasedExcessComponent } from './value-based-excess.component';

describe('ValueBasedExcessComponent', () => {
  let component: ValueBasedExcessComponent;
  let fixture: ComponentFixture<ValueBasedExcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueBasedExcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueBasedExcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
