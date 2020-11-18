import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderModule} from './components/header/header.module';
import {SidebarModule} from './components/sidebar/sidebar.module';
import {HttpClientModule} from '@angular/common/http';
import {MessageModule} from './components/message/message.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from './components/modal/modal.module';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    SidebarModule,
    MessageModule,
    ModalModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
