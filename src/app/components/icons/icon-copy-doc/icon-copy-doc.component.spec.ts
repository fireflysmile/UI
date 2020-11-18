import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCopyDocComponent } from './icon-copy-doc.component';

describe('IconCopyDocComponent', () => {
  let component: IconCopyDocComponent;
  let fixture: ComponentFixture<IconCopyDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCopyDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCopyDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
