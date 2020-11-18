import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBackComponent } from './icon-back.component';

describe('IconBackComponent', () => {
  let component: IconBackComponent;
  let fixture: ComponentFixture<IconBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
