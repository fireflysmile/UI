import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { OrderModificationPageComponent } from './order-modification-page.component';

describe('OrderModificationPageComponent', () => {
  let component: OrderModificationPageComponent;
  let fixture: ComponentFixture<OrderModificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderModificationPageComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
