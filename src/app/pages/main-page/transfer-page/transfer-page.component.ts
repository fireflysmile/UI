import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TablePageBaseComponent} from '../table-page-base/table-page-base.component';
import {TransferItem} from '../../../models/transfer-item';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {TransferService} from '../../../services/api/transfer.service';
import {TableColumnService} from '../../../services/components/table-column.service';
import {finalize} from 'rxjs/operators';
import {MessageService} from '../../../components/message/message.service';

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: [
    '../table-page-base/table-page-base.component.scss',
    './transfer-page.component.scss',
  ],
})
export class TransferPageComponent extends TablePageBaseComponent<TransferItem> implements OnInit {
  // file input ref
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement>;
  // segment
  segment: string;
  // collateral
  collateral: string;
  // instrument type
  instrumentType: string;

  constructor(
    public tableColumnService: TableColumnService,
    private messageService: MessageService,
    private transferService: TransferService,
    private changeDetectorRef: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
  ) {
    super([], [
      [
        {
          icon: 'upload',
          label: 'Upload File',
          action: () => this.fileInputRef.nativeElement.click(),
        },
        {
          icon: 'clear',
          label: 'Clear all search',
          disabled: () => this.filters.length === 0 || this.filters.every(item => !item.value),
          action: () => this._clearAllSearch(),
        },
        {
          icon: 'reload',
          label: 'Clear Sort',
          disabled: () => !this.sort,
          action: () => this._clearAllSort(),
        },
        {
          icon: 'grid',
          label: 'Layout',
          action() {
            this.opened = !this.opened;
          },
          opened: false,
          moreOptionsConfig: {
            type: 'layout',
            onSelectHideClick: () => this.layoutView = true,
            onReorderClick: () => this.layoutView = true,
            onShowHiddenClick: () => {
              this.tableColumnService.transferColumnConfig = this.configs.map(item => ({...item, show: true}));
              this._setColumnFilters();
            },
            hiddenColumns: () => this.configs.filter(item => !item.show).length,
          },
        },
      ]
    ]);

    this.callSetColumnFilters = this.callSetColumnFilters.bind(this);

    this._getTransferColumns();
    this._getTransferColumnConfigs();
  }

  ngOnInit() {
    this._getTransfers();
  }

  /**
   * override getter
   */
  getClonedOriginalData(): TransferItem[] {
    return super.getClonedOriginalData().filter(item => (
      item.segment === this.segment
      && item.collateral === this.collateral
      && item.instrumentType === this.instrumentType
    ));
  }

  /**
   * get transfer columns
   */
  private _getTransferColumns(): void {
    const sub = this.tableColumnService.transferColumns$
      .subscribe(columns => this.columns = columns);

    this.subscriptionService.store('_getTransferColumns', sub);
  }

  /**
   * get transfer column configs
   */
  private _getTransferColumnConfigs(): void {
    const sub = this.tableColumnService.transferColumnConfig$
      .subscribe(configs => this.configs = configs);

    this.subscriptionService.store('_getTransferColumnConfigs', sub);
  }

  /**
   * get collateral details
   */
  private _getTransfers(): void {
    this.loading = true;

    const sub = this.transferService
      .getTransfers()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this._originalData = res;
          this.createDisplayableData();
        },
      });

    this.subscriptionService.store('_getTransfers', sub);
  }

  /**
   * override setColumnFilters method
   */
  protected _setColumnFilters() {
    super._setColumnFilters();

    this.columns.forEach(item => {
      if (item.property === 'destinationSegment') {
        item.filterOptions.forEach(option => {
          const find = this.segmentOptions.find(segment => segment.value === option.value);

          if (find) {
            option.label = find.label;
          }
        });
      }
    });
  }

  /**
   * wrapper for setColumnFilters
   */
  callSetColumnFilters(): void {
    this._setColumnFilters();
  }

  /**
   * handle toggleable filter change
   */
  toggleableFilterChange(): void {
    // remove all selection
    this._originalData.forEach(item => item.selected = false);

    this._setColumnFilters();
    this.createDisplayableData();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * handle file upload
   * @param event event
   */
  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files[0];

    if (file && file.type !== 'application/vnd.ms-excel') {
      this.messageService.open('error', 'Only csv file is allowed');
    }

    input.value = null;
  }
}
