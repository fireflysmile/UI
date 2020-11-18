import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAddSquareComponent } from './icon-add-square.component';

describe('IconAddSquareComponent', () => {
  let component: IconAddSquareComponent;
  let fixture: ComponentFixture<IconAddSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAddSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAddSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
