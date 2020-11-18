import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageTitleModule} from '../../../components/page-title/page-title.module';
import {PageContentModule} from '../../../components/page-content/page-content.module';
import {PageActionsModule} from '../../../components/page-actions/page-actions.module';
import {CardModule} from '../../../components/card/card.module';
import {CardActionsModule} from '../../../components/card-actions/card-actions.module';
import {TableModule} from '../../../components/table/table.module';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {TableLayoutEditorModule} from '../../../components/table-layout-editor/table-layout-editor.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PageTitleModule,
    PageContentModule,
    PageActionsModule,
    CardModule,
    CardActionsModule,
    TableModule,
    TableLayoutEditorModule,
  ],
  exports: [
    PageTitleModule,
    PageContentModule,
    PageActionsModule,
    CardModule,
    CardActionsModule,
    TableModule,
    TableLayoutEditorModule,
  ],
  providers: [
    SubscriptionService,
  ]
})
export class TablePageBaseModule { }
