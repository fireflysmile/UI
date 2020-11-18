import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconChecksComponent } from './icon-checks.component';

describe('IconChecksComponent', () => {
  let component: IconChecksComponent;
  let fixture: ComponentFixture<IconChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
