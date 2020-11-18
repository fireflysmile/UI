import {AfterViewInit, Component, HostBinding, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService} from '../modal.service';

@Component({
  selector: 'app-modal-outlet',
  templateUrl: './modal-outlet.component.html',
  styleUrls: ['./modal-outlet.component.scss']
})
export class ModalOutletComponent implements OnInit, AfterViewInit {
  // viewContainerRef
  @ViewChild('container', { read: ViewContainerRef }) private viewContainerRef: ViewContainerRef;
  // set top position
  // default is top
  @HostBinding('attr.ts-position') position = 'top';

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * set viewContainerRef to service when view initialized
   */
  ngAfterViewInit(): void {
    this.modalService.modalOutlet = this;
    this.modalService.viewContainerRef = this.viewContainerRef;
  }
}
