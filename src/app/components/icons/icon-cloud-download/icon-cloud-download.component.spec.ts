import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCloudDownloadComponent } from './icon-cloud-download.component';

describe('IconCloudDownloadComponent', () => {
  let component: IconCloudDownloadComponent;
  let fixture: ComponentFixture<IconCloudDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCloudDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCloudDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
