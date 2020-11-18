import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFileDownloadComponent } from './icon-file-download.component';

describe('IconFileDownloadComponent', () => {
  let component: IconFileDownloadComponent;
  let fixture: ComponentFixture<IconFileDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconFileDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
