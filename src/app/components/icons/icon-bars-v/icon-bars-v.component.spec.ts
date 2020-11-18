import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBarsVComponent } from './icon-bars-v.component';

describe('IconBarsVComponent', () => {
  let component: IconBarsVComponent;
  let fixture: ComponentFixture<IconBarsVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconBarsVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBarsVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
