import { NgModule } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AssignModalData } from '../../assign-modal/assign-modal.component';
import { ModalModule } from '../modal.module';
import { ModalService } from '../modal.service';
import { TS_MODAL_REF, TS_MODAL_DATA } from './ts-modal-options';
import { TsModalRef } from './ts-modal-ref';
import { By } from '@angular/platform-browser';
import { ModalBackgroundComponent } from '../modal-background/modal-background.component';
import { ModalHeaderComponent } from '../components/modal-header/modal-header.component';

@Component({
  selector: 'app-modal',
  template: `<div><app-modal-header> Assign </app-modal-header></div>`,
})
export class ModalComponent implements OnInit {
  constructor(@Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<ModalComponent>, @Inject(TS_MODAL_DATA) private data: AssignModalData) {}

  ngOnInit() {}

  closeModal() {
    this.tsModalRef.close();
  }
}

@Component({
  selector: 'app-test-modal',
  template: `<div><app-modal-outlet></app-modal-outlet></div>`,
})
export class TestComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  showModal(withClose: boolean) {
    if (withClose) {
      this.modalService.open(ModalComponent, {
        data: {} as AssignModalData,
        onClose: (res) => {},
        suppressCloseOnClickOutside: true,
      });
    } else {
      this.modalService.open(ModalComponent);
    }
  }

  closeModal() {
    this.modalService.close(null);
  }
}

@NgModule({
  declarations: [ModalComponent],
  imports: [ModalModule, TestSharedModule],
  exports: [ModalModule, TestSharedModule],
})
class TestModule {}

describe('TsModalRef', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [TestModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show/hide modal', () => {
    component.showModal(true);
    fixture.detectChanges();
    let modalComponent = fixture.debugElement.query(By.directive(ModalComponent));
    expect(modalComponent).toBeTruthy();

    modalComponent.componentInstance.closeModal();
    modalComponent = fixture.debugElement.query(By.directive(ModalComponent));
    expect(modalComponent).toBeTruthy();
    fixture.detectChanges();

    component.showModal(false);
    modalComponent = fixture.debugElement.query(By.directive(ModalComponent));
    const backgroundComponent: ModalBackgroundComponent = fixture.debugElement.query(By.directive(ModalBackgroundComponent))
      .componentInstance;

    backgroundComponent.onHostClicked();
    modalComponent = fixture.debugElement.query(By.directive(ModalComponent));
    expect(modalComponent).toBeTruthy();
    fixture.detectChanges();

    component.showModal(true);
    fixture.detectChanges();
    const headerComponent: ModalHeaderComponent = fixture.debugElement.query(By.directive(ModalHeaderComponent)).componentInstance;
    headerComponent.closeModal();
    component.closeModal();
    modalComponent = fixture.debugElement.query(By.directive(ModalComponent));
    expect(modalComponent).toBeTruthy();
    fixture.detectChanges();
  });
});
