import {
  ComponentFactoryResolver,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import {ModalOutletComponent} from './modal-outlet/modal-outlet.component';
import {TsModalRef} from './models/ts-modal-ref';
import {TsModalOptions} from './models/ts-modal-options';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // modal outlet
  modalOutlet: ModalOutletComponent;
  // modal ref map
  private _modalRefMap: {[k: string]: TsModalRef<any>} = {};

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    TsModalRef.componentFactoryResolver = componentFactoryResolver;
  }

  /**
   * set view container reference
   * @param viewContainerRef view container reference
   */
  set viewContainerRef(viewContainerRef: ViewContainerRef) {
    TsModalRef.viewContainerRef = viewContainerRef;
  }

  /**
   * open component
   * @param component component
   * @param options modal options
   */
  open<T>(component: Type<T>, options: TsModalOptions = {}): TsModalRef<T> {
    const ref = new TsModalRef<T>(component, options);

    this._modalRefMap[ref.id] = ref;

    return ref;
  }

  /**
   * close modal
   * @param id modal ref id
   * @param returns return value
   */
  close(id: string, returns?: any): void {
    if (this._modalRefMap[id]) {
      this._modalRefMap[id].close(returns);
      delete this._modalRefMap[id];
    }
  }
}
