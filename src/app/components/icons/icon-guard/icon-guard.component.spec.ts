import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconGuardComponent } from './icon-guard.component';

describe('IconGuardComponent', () => {
  let component: IconGuardComponent;
  let fixture: ComponentFixture<IconGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
