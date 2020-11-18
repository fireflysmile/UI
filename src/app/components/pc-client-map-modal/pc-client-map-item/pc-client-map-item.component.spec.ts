import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AutoCloserModule } from '../../auto-closer/auto-closer.module';
import { FormErrorModule } from '../../form-error/form-error.module';
import { FormFieldModule } from '../../form-field/form-field.module';
import { SearchSelectModule } from '../../search-select/search-select.module';

import { PcClientMapItemComponent } from './pc-client-map-item.component';

describe('PcClientMapItemComponent', () => {
  let component: PcClientMapItemComponent;
  let fixture: ComponentFixture<PcClientMapItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcClientMapItemComponent],
      imports: [
        TestSharedModule,
        SearchSelectModule,
        FormFieldModule,
        FormErrorModule,
        AutoCloserModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcClientMapItemComponent);
    component = fixture.componentInstance;
    component.data = {
      pcCode: 'string',
      clientCode: 'string',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data', () => {
    component.data = {
      pcCode: 'string',
      clientCode: 'string',
    };
    component.clientCode = { valid: true } as any;
    expect(component.valid).toBeTruthy();
  });

  it('should get available pc code', fakeAsync(() => {
    component.getAvailablePCCodes('');
    tick(2000);
    expect(component.codes).toBeTruthy();
  }));

  it('should check duplicated client code', fakeAsync(() => {
    let clientCodeControlValue;
    component.clientCode = {
      value: 'key1',
      control: {
        setErrors: (value) => {
          clientCodeControlValue = value;
        },
      },
    } as any;
    component.checkDuplicatedClientCode({
      key1: true,
    });
    expect(clientCodeControlValue).toEqual({ duplicated: true });
    component.checkDuplicatedClientCode({
      key43: true,
    });
    expect(clientCodeControlValue).toEqual(null);
  }));
});
