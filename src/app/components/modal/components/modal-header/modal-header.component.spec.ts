import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ModalService } from '../../modal.service';

import { ModalHeaderComponent } from './modal-header.component';

describe('ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;
  let fixture: ComponentFixture<ModalHeaderComponent>;
  let router: Router;
  let modalservice: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHeaderComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHeaderComponent);
    component = fixture.componentInstance;
    modalservice = TestBed.inject(ModalService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    const spyOnClose = spyOn(modalservice, 'close');
    component.closeModal();
    expect(spyOnClose).toHaveBeenCalled();
  });

  it('should close modal when navigate', () => {
    const spyOnClose = spyOn(component, 'closeModal');
    const spyOnSubscribe = spyOn(
      router.events,
      'subscribe'
    ).and.callFake((cb) => cb(null));
    component.ngOnInit();
    expect(spyOnClose).not.toHaveBeenCalled();

    spyOnSubscribe.and.callFake((cb) => cb(new NavigationEnd(0, '', '')));
    component.ngOnInit();
    expect(spyOnClose).toHaveBeenCalled();
  });
});
