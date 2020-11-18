import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconExclamationComponent } from './icon-exclamation.component';

describe('IconExclamationComponent', () => {
  let component: IconExclamationComponent;
  let fixture: ComponentFixture<IconExclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconExclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconExclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
