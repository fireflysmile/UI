import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreOptionItemComponent } from './more-option-item.component';

describe('MoreOptionItemComponent', () => {
  let component: MoreOptionItemComponent;
  let fixture: ComponentFixture<MoreOptionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreOptionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreOptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
