import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBarsHComponent } from './icon-bars-h.component';

describe('IconBarsHComponent', () => {
  let component: IconBarsHComponent;
  let fixture: ComponentFixture<IconBarsHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconBarsHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBarsHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
