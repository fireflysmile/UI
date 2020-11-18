import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconToggleOffComponent } from './icon-toggle-off.component';

describe('IconToggleOffComponent', () => {
  let component: IconToggleOffComponent;
  let fixture: ComponentFixture<IconToggleOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconToggleOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconToggleOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
