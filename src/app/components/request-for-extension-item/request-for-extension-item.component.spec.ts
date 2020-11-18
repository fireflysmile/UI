import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { RequestForExtensionItemComponent } from './request-for-extension-item.component';

describe('RequestForExtensionItemComponent', () => {
  let component: RequestForExtensionItemComponent;
  let fixture: ComponentFixture<RequestForExtensionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestForExtensionItemComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForExtensionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
