import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBrowserEyeComponent } from './icon-browser-eye.component';

describe('IconBrowserEyeComponent', () => {
  let component: IconBrowserEyeComponent;
  let fixture: ComponentFixture<IconBrowserEyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconBrowserEyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBrowserEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
