import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStackedWindowsComponent } from './icon-stacked-windows.component';

describe('IconStackedWindowsComponent', () => {
  let component: IconStackedWindowsComponent;
  let fixture: ComponentFixture<IconStackedWindowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconStackedWindowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconStackedWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
