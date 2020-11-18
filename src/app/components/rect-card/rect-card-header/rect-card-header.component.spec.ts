import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectCardHeaderComponent } from './rect-card-header.component';

describe('RectCardHeaderComponent', () => {
  let component: RectCardHeaderComponent;
  let fixture: ComponentFixture<RectCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
