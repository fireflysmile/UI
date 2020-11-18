import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DividerModule } from '../../divider/divider.module';
import { FormFieldModule } from '../../form-field/form-field.module';
import { ModalModule } from '../../modal/modal.module';

import { IconSignatureComponent } from './icon-signature.component';

describe('IconSignatureComponent', () => {
  let component: IconSignatureComponent;
  let fixture: ComponentFixture<IconSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconSignatureComponent],
      imports: [TestSharedModule, ModalModule, FormFieldModule, DividerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
