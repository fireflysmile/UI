import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {LayoutConfig} from '../../models/layout-config';
import {ActionItem} from '../../models/action-item';
import {TableLayoutItemComponent} from '../table-layout-item/table-layout-item.component';
import {DOCUMENT} from '@angular/common';
import {MessageService} from '../message/message.service';

@Component({
  selector: 'app-table-layout-editor',
  templateUrl: './table-layout-editor.component.html',
  styleUrls: ['./table-layout-editor.component.scss']
})
export class TableLayoutEditorComponent<T> implements OnInit {
  // set label for editor
  // default label is Reorder Columns
  @Input() set label(label: string) {
    this.actionGroups = [
      [
        // the first action will be label
        {
          icon: null,
          label: label || 'Reorder Columns',
          disabled: () => true,
          action: () => {
          },
        },
        {
          icon: 'save',
          label: 'Save',
          action: () => {
            this.messageService.open('success', 'Layout successfully changed');
            this.saveClick.emit(this.layouts);
          },
        },
        {
          icon: 'reload',
          label: 'Reset',
          action: () => this._layouts = this.initialConfigs,
        },
        {
          icon: 'close',
          label: 'Cancel',
          action: () => this.cancelClick.emit(),
        },
      ]
    ];
  }
  // set layouts
  @Input() set layouts(layouts: LayoutConfig<T>[]) {
    // clone layouts to edit
    this._layouts = layouts.map(item => ({...item}));
  }
  // initial configs for reverting
  @Input() initialConfigs: LayoutConfig<T>[] = [];
  // save click
  @Output() saveClick: EventEmitter<LayoutConfig<T>[]> = new EventEmitter<LayoutConfig<T>[]>();
  // cancel click
  @Output() cancelClick: EventEmitter<void> = new EventEmitter();
  // scroll container
  @ViewChild('scrollContainer') scrollContainerRef: ElementRef<HTMLElement>;
  // table items
  @ViewChildren(TableLayoutItemComponent) tableItems: QueryList<TableLayoutItemComponent<T>>;
  // actions groups
  actionGroups: ActionItem[][] = [
    [
      {
        icon: null,
        label: 'Reorder Columns',
        disabled: () => true,
        action: () => {},
      },
      {
        icon: 'save',
        label: 'Save',
        action: () => {
          this.messageService.open('success', 'Layout successfully changed');
          this.saveClick.emit(this.layouts);
        },
      },
      {
        icon: 'reload',
        label: 'Reset',
        action: () => this._layouts = this.initialConfigs,
      },
      {
        icon: 'close',
        label: 'Cancel',
        action: () => this.cancelClick.emit(),
      },
    ]
  ];
  // handling layout
  handling: LayoutConfig<T>;
  // placed index
  placedIndex = -1;
  // cloned element
  private _clonedElement: HTMLElement;
  // layouts
  private _layouts: LayoutConfig<T>[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private messageService: MessageService,
  ) {
    this._onHandleRelease = this._onHandleRelease.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
  }

  ngOnInit() {
  }

  /**
   * return layouts
   */
  get layouts(): LayoutConfig<T>[] {
    return this._layouts;
  }

  /**
   * return the number of visible layouts
   */
  get visibleLayouts(): number {
    return this.layouts.filter(item => item.show).length;
  }

  /**
   * handle pressed
   * @param event mouse event
   * @param layout pressed layout
   * @param component layout item component
   */
  onHandlePress(event: MouseEvent, layout: LayoutConfig<T>, component: TableLayoutItemComponent<T>): void {
    this.handling = layout;
    this._clonedElement = component.elementRef.nativeElement.cloneNode(true) as HTMLElement;
    this.renderer.appendChild(this.scrollContainerRef.nativeElement, this._clonedElement);
    this.renderer.setStyle(this._clonedElement, 'position', 'fixed');
    this.renderer.setStyle(this._clonedElement, 'box-shadow', '0 3px 12px rgba(0, 0, 0, .16)');
    this.renderer.setStyle(this._clonedElement, 'pointer-events', 'none');
    this.renderer.addClass(this.document.body, 'cm-grabbing');

    // call mouse move to set initial position
    this._onMouseMove(event);
    this._addHandleReleaseEvent();
    this._addMouseMoveEvent();
  }

  /**
   * add handle release event
   */
  private _addHandleReleaseEvent(): void {
    window.addEventListener('mouseup', this._onHandleRelease);
  }

  /**
   * on handle release
   */
  private _onHandleRelease(): void {
    this._createReorderedLayouts();

    this.renderer.removeChild(this.scrollContainerRef.nativeElement, this._clonedElement);
    this.renderer.removeClass(this.document.body, 'cm-grabbing');
    this.handling = null;
    this._clonedElement = null;
    this.placedIndex = -1;

    this._removeHandleReleaseEvent();
    this._removeMouseMoveEvent();
  }

  /**
   * create reordered layouts according to index
   */
  private _createReorderedLayouts(): void {
    if (this.placedIndex !== -1) {
      const handlingIndex = this._layouts.findIndex(item => item === this.handling);

      this._layouts = [
        ...this._layouts.splice(0, this.placedIndex).filter(item => handlingIndex < this.placedIndex ? item !== this.handling : true),
        this.handling,
        ...this._layouts.filter(item => handlingIndex > this.placedIndex ? item !== this.handling : true),
      ];
    }
  }

  /**
   * remove handle release event
   */
  private _removeHandleReleaseEvent(): void {
    window.removeEventListener('mouseup', this._onHandleRelease);
  }

  /**
   * add mouse move event
   */
  private _addMouseMoveEvent(): void {
    window.addEventListener('mousemove', this._onMouseMove);
  }

  /**
   * handle mouse move
   * @param event mouse event
   */
  private _onMouseMove(event: MouseEvent): void {
    if (this._clonedElement) {
      this.renderer.setStyle(this._clonedElement, 'top', (event.clientY - 16) + 'px');
      this.renderer.setStyle(this._clonedElement, 'left', (event.clientX - 45) + 'px');
    }
  }

  /**
   * remove mouse move event
   */
  private _removeMouseMoveEvent(): void {
    window.removeEventListener('mousemove', this._onMouseMove);
  }

  /**
   * handle mouse enter to layout item
   * @param index index of layout item
   */
  onMouseEnterToLayoutItem(index: number): void {
    if (this.handling) {
      this.placedIndex = index;
    }
  }

  /**
   * handle visibility button click
   * @param item clicked item
   */
  onVisibilityButtonClick(item: LayoutConfig<T>): void {
    if (item.show) {
      // try to change show to hide
      if (this.visibleLayouts > 1) {
        item.show = !item.show;
      } else {
        this.messageService.open('error', `Unhide at least one column for display`);
      }
    } else {
      // try to change hide to show
      item.show = !item.show;
    }
  }
}
