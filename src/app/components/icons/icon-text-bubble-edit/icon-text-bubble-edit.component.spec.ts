import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextBubbleEditComponent } from './icon-text-bubble-edit.component';

describe('IconTextBubbleEditComponent', () => {
  let component: IconTextBubbleEditComponent;
  let fixture: ComponentFixture<IconTextBubbleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconTextBubbleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTextBubbleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
