import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MessageService} from '../message.service';
import {randomKey} from '../../../utils/random.util';

@Component({
  selector: 'app-message-outlet',
  templateUrl: './message-outlet.component.html',
  styleUrls: ['./message-outlet.component.scss']
})
export class MessageOutletComponent implements OnInit, AfterViewInit, OnDestroy {
  // view container ref
  @ViewChild('container', { read: ViewContainerRef }) public viewContainerRef: ViewContainerRef;
  // generate random id
  private _id = randomKey();

  constructor(
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * set viewContainerRef to service when view initialized
   */
  ngAfterViewInit(): void {
    this.messageService.appendViewContainer(this._id, this.viewContainerRef);
  }

  /**
   * destroy view container when destroying
   */
  ngOnDestroy(): void {
    this.messageService.destroyViewContainer(this._id);
  }
}
