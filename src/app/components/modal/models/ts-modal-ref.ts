import {ComponentFactoryResolver, ComponentRef, Injector, Type, ViewContainerRef} from '@angular/core';
import {ModalBackgroundComponent} from '../modal-background/modal-background.component';
import {ModalContentWrapperComponent} from '../modal-content-wrapper/modal-content-wrapper.component';
import {randomKey} from '../../../utils/random.util';
import {Subscription} from 'rxjs';
import {TS_MODAL_DATA, TS_MODAL_REF, TsModalOptions, TsModalPosition} from './ts-modal-options';
import {ModalWrapperComponent} from '../modal-wrapper/modal-wrapper.component';

export class TsModalRef<T> {
  // set view container ref
  static set viewContainerRef(viewContainerRef: ViewContainerRef) {
    TsModalRef._viewContainerRef = viewContainerRef;
  }
  // set component factory resolver
  static set componentFactoryResolver(componentFactoryResolver: ComponentFactoryResolver) {
    TsModalRef._componentFactoryResolver = componentFactoryResolver;
  }
  // view container ref
  private static _viewContainerRef: ViewContainerRef;
  // component factory resolver
  private static _componentFactoryResolver: ComponentFactoryResolver;
  // random id
  id = randomKey();
  // close callback
  private _onClose: (returns?: any) => void;
  // modal wrapper
  private _modalWrapper: ComponentRef<ModalWrapperComponent>;
  // background
  private _background: ComponentRef<ModalBackgroundComponent>;
  // content wrapper
  private _contentWrapper: ComponentRef<ModalContentWrapperComponent>;
  // subscriptions
  private _subscriptions: Subscription = new Subscription();

  constructor(component: Type<T>, options: TsModalOptions) {
    const {position, data, onClose, suppressCloseOnClickOutside} = options;

    this._createModalWrapper();
    this._createBackground(suppressCloseOnClickOutside);
    this._createContentWrapper(position);
    this._createModal(component, data, onClose);
  }

  /**
   * return view container ref
   */
  get viewContainerRef(): ViewContainerRef {
    return TsModalRef._viewContainerRef;
  }

  /**
   * return component factory resolver
   */
  get componentFactoryResolver(): ComponentFactoryResolver {
    return TsModalRef._componentFactoryResolver;
  }

  /**
   * return modal view container ref
   */
  get modalViewContainerRef(): ViewContainerRef {
    return this._modalWrapper.instance.viewContainerRef;
  }

  /**
   * return content view container ref
   */
  get contentViewContainerRef(): ViewContainerRef {
    return this._contentWrapper.instance.viewContainerRef;
  }

  /**
   * create main wrapper for modal
   */
  private _createModalWrapper(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalWrapperComponent);
    this._modalWrapper = this.viewContainerRef.createComponent(factory);
    this._modalWrapper.changeDetectorRef.detectChanges();
  }

  /**
   * create background
   * @param suppress suppress close on click
   */
  private _createBackground(suppress: boolean): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalBackgroundComponent);
    this._background = this.modalViewContainerRef.createComponent(factory);

    if (!suppress) {
      this._subscribeBackgroundClose(this._background);
    }
  }

  /**
   * create content wrapper
   * @param position modal position
   */
  private _createContentWrapper(position: TsModalPosition): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalContentWrapperComponent);
    this._contentWrapper = this.modalViewContainerRef.createComponent(factory);
    this._contentWrapper.changeDetectorRef.detectChanges();
  }

  /**
   * create modal component
   * @param component component
   * @param data data
   * @param onClose on close callback
   */
  private _createModal(
    component: Type<T>,
    data: any,
    onClose: (returns?: any) => void,
  ): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    const injector = Injector.create({
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: data,
        },
        {
          provide: TS_MODAL_REF,
          useValue: this,
        }
      ],
    });

    this.contentViewContainerRef.createComponent(factory, 0, injector);

    this._contentWrapper.instance.setModalIdToHeader(this.id);
    this._onClose = onClose;
  }

  /**
   * subscribe background close
   * @param background background component ref
   */
  private _subscribeBackgroundClose(background: ComponentRef<ModalBackgroundComponent>): void {
    const sub = background.instance.backgroundClose.subscribe(() => this.close());

    this._subscriptions.add(sub);
  }

  /**
   * destroy modal
   */
  private _destroyModal(): void {
    this._background.destroy();
    this._contentWrapper.destroy();
    this._modalWrapper.destroy();
  }

  /**
   * close current modal
   * @param returns returns
   */
  close(returns?: any): void {
    this._destroyModal();
    this._subscriptions.unsubscribe();

    if (this._onClose) {
      this._onClose(returns);
    }
  }
}
