import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDocumentOutlineComponent } from './icon-document-outline.component';

describe('IconDocumentOutlineComponent', () => {
  let component: IconDocumentOutlineComponent;
  let fixture: ComponentFixture<IconDocumentOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconDocumentOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDocumentOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
