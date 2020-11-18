import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../components/icons/icons.module';
import { SubscriptionService } from '../services/subscription/subscription.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    BrowserAnimationsModule,
    RouterTestingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
  ],
  providers: [SubscriptionService],
})
export class TestSharedModule {}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    BrowserAnimationsModule,
    RouterTestingModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
  ],
})
export class MockHTTPTestSharedModule {}
