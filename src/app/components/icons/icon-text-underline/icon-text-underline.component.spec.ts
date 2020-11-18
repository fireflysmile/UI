import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextUnderlineComponent } from './icon-text-underline.component';

describe('IconTextUnderlineComponent', () => {
  let component: IconTextUnderlineComponent;
  let fixture: ComponentFixture<IconTextUnderlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconTextUnderlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTextUnderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
