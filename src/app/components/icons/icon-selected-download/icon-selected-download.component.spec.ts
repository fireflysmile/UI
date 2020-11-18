import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSelectedDownloadComponent } from './icon-selected-download.component';

describe('IconSelectedDownloadComponent', () => {
  let component: IconSelectedDownloadComponent;
  let fixture: ComponentFixture<IconSelectedDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSelectedDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSelectedDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
