import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFilteredDownloadComponent } from './icon-filtered-download.component';

describe('IconFilteredDownloadComponent', () => {
  let component: IconFilteredDownloadComponent;
  let fixture: ComponentFixture<IconFilteredDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconFilteredDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconFilteredDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
