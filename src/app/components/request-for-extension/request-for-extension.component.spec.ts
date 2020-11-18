import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RequestForExtensionItemModule } from '../request-for-extension-item/request-for-extension-item.module';

import { RequestForExtensionComponent } from './request-for-extension.component';

describe('RequestForExtensionComponent', () => {
  let component: RequestForExtensionComponent;
  let fixture: ComponentFixture<RequestForExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestForExtensionComponent],
      imports: [TestSharedModule, RequestForExtensionItemModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
