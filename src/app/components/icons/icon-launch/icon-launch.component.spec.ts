import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLaunchComponent } from './icon-launch.component';

describe('IconLaunchComponent', () => {
  let component: IconLaunchComponent;
  let fixture: ComponentFixture<IconLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
