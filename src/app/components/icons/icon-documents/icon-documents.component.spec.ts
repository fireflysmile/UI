import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDocumentsComponent } from './icon-documents.component';

describe('IconDocumentsComponent', () => {
  let component: IconDocumentsComponent;
  let fixture: ComponentFixture<IconDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
