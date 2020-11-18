import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEditCircleGreenComponent } from './icon-edit-circle-green.component';

describe('IconEditCircleGreenComponent', () => {
  let component: IconEditCircleGreenComponent;
  let fixture: ComponentFixture<IconEditCircleGreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconEditCircleGreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconEditCircleGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
