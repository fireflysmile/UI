import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAttachmentComponent } from './icon-attachment.component';

describe('IconAttachmentComponent', () => {
  let component: IconAttachmentComponent;
  let fixture: ComponentFixture<IconAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
