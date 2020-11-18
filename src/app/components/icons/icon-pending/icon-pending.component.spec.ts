import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPendingComponent } from './icon-pending.component';

describe('IconPendingComponent', () => {
  let component: IconPendingComponent;
  let fixture: ComponentFixture<IconPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
