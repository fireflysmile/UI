import {ComponentFactoryResolver, ComponentRef, Injectable, OnDestroy, ViewContainerRef} from '@angular/core';
import {MessageItemComponent, TsMessageType} from './message-item/message-item.component';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService implements OnDestroy {
  // view container ref map
  // to allow multiple outlets, use map
  private _viewContainerRefMap: {[k: string]: ViewContainerRef} = {};
  // message item ref map
  // allow each outlet to create message
  // all message item shares same contents and state
  private _messageItemRefMap: {[k: string]: ComponentRef<MessageItemComponent>} = {};
  // subscriptions
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /**
   * append view container
   * @param id view container id
   * @param viewContainerRef view container ref
   */
  appendViewContainer(id: string, viewContainerRef: ViewContainerRef): void {
    this._viewContainerRefMap[id] = viewContainerRef;
    this._cloneMessageOnAppend(id);
  }

  /**
   * if already created message item exists,
   * clone message on new view container ref appended
   * @param appendedId appended container id
   */
  private _cloneMessageOnAppend(appendedId: string): void {
    const id = Object.keys(this._messageItemRefMap).find(item => this._messageItemRefMap[item]);

    if (id) {
      const message = this._messageItemRefMap[id];
      const factory = this.componentFactoryResolver.resolveComponentFactory(MessageItemComponent);
      const messageItemRef = this._viewContainerRefMap[appendedId].createComponent(factory);

      messageItemRef.instance.type = message.instance.type;
      messageItemRef.instance.message = message.instance.message;
      // when cloning, also clone remaining count
      messageItemRef.instance.count = message.instance.count;
      // set toasted state
      messageItemRef.instance.toast = 'toasted';
      messageItemRef.changeDetectorRef.detectChanges();

      this._messageItemRefMap[appendedId] = messageItemRef;
      // re-create subscription for close
      this._subscribeForClose();
    }
  }

  /**
   * destroy view container by id
   * @param id view container id
   */
  destroyViewContainer(id: string): void {
    if (this._messageItemRefMap[id]) {
      this._messageItemRefMap[id].destroy();
    }
    this._messageItemRefMap[id] = null;
    this._viewContainerRefMap[id] = null;
  }

  /**
   * open message
   * @param type message type
   * @param message message
   */
  open(type: TsMessageType, message: string): void {
    this._destroyMessageItem();
    this._createMessageItems(type, message);
    this._subscribeForClose();
  }

  /**
   * create message items for every view containers
   * @param type message type
   * @param message message
   */
  private _createMessageItems(type: TsMessageType, message: string): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(MessageItemComponent);

    Object.keys(this._viewContainerRefMap).forEach(id => {
      const messageItemRef = this._viewContainerRefMap[id].createComponent(factory);
      messageItemRef.instance.type = type;
      messageItemRef.instance.message = message;
      messageItemRef.changeDetectorRef.detectChanges();

      if (this._messageItemRefMap[id]) {
        this._messageItemRefMap[id].destroy();
      }

      this._messageItemRefMap[id] = messageItemRef;
    });
  }

  /**
   * subscribe for close emitter
   */
  private _subscribeForClose(): void {
    const subs = Object.keys(this._messageItemRefMap)
      .filter(id => this._messageItemRefMap[id])
      .map(id => this._messageItemRefMap[id].instance.messageClose.subscribe(() => {
        this._destroyMessageItem();
      }));

    // add subscriptions
    subs.forEach(sub => this._subscriptions.add(sub));
  }

  /**
   * destroy all message items
   */
  private _destroyMessageItem(): void {
    // destroy all items
    Object.keys(this._messageItemRefMap).forEach(id => {
      if (this._messageItemRefMap[id]) {
        this._messageItemRefMap[id].destroy();
      }
      delete this._messageItemRefMap[id];
    });
  }
}
