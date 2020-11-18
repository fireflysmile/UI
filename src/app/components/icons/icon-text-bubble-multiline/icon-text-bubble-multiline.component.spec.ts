import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextBubbleMultilineComponent } from './icon-text-bubble-multiline.component';

describe('IconTextBubbleMultilineComponent', () => {
  let component: IconTextBubbleMultilineComponent;
  let fixture: ComponentFixture<IconTextBubbleMultilineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconTextBubbleMultilineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTextBubbleMultilineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
