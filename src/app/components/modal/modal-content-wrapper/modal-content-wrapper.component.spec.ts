import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { ModalContentWrapperComponent } from './modal-content-wrapper.component';

describe('ModalContentWrapperComponent', () => {
  let component: ModalContentWrapperComponent;
  let fixture: ComponentFixture<ModalContentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalContentWrapperComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.setModalIdToHeader('');
    expect(component).toBeTruthy();
  });
});
