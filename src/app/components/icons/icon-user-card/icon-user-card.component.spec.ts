import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUserCardComponent } from './icon-user-card.component';

describe('IconUserCardComponent', () => {
  let component: IconUserCardComponent;
  let fixture: ComponentFixture<IconUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
