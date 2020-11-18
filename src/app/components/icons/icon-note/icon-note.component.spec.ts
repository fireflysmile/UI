import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconNoteComponent } from './icon-note.component';

describe('IconNoteComponent', () => {
  let component: IconNoteComponent;
  let fixture: ComponentFixture<IconNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
