import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCloudUploadComponent } from './icon-cloud-upload.component';

describe('IconCloudUploadComponent', () => {
  let component: IconCloudUploadComponent;
  let fixture: ComponentFixture<IconCloudUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCloudUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCloudUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
