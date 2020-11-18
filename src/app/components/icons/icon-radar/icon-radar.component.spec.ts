import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRadarComponent } from './icon-radar.component';

describe('IconRadarComponent', () => {
  let component: IconRadarComponent;
  let fixture: ComponentFixture<IconRadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconRadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
