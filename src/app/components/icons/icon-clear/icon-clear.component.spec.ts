import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconClearComponent } from './icon-clear.component';

describe('IconClearComponent', () => {
  let component: IconClearComponent;
  let fixture: ComponentFixture<IconClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
