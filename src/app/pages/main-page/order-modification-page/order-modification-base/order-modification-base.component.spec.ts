import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { OrderModificationBaseComponent } from './order-modification-base.component';

describe('OrderModificationBaseComponent', () => {
  let component: OrderModificationBaseComponent;
  let fixture: ComponentFixture<OrderModificationBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderModificationBaseComponent],
      imports: [TestSharedModule, ModalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModificationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
