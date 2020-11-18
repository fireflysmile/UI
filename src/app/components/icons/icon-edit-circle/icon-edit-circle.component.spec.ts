import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEditCircleComponent } from './icon-edit-circle.component';

describe('IconEditCircleComponent', () => {
  let component: IconEditCircleComponent;
  let fixture: ComponentFixture<IconEditCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconEditCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconEditCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
