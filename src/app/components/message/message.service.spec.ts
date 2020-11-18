import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
  discardPeriodicTasks,
} from '@angular/core/testing';

import { MessageService } from './message.service';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageModule } from './message.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

@Component({
  template: `<div #container></div>`,
})
class TestDirectiveComponent {
  // view container ref
  @ViewChild('container', { read: ViewContainerRef })
  public viewContainerRef: ViewContainerRef;
}

describe('MessageService', () => {
  let service: MessageService;
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent],
      imports: [MessageModule, TestSharedModule],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MessageService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clone message on append', fakeAsync(() => {
    service.appendViewContainer('newId', component.viewContainerRef);
    service.open('success', 'successfully');
    service.appendViewContainer('newId', component.viewContainerRef);
    service.open('success', 'successfully');
    service.destroyViewContainer('newId');
    tick(10000);
    fixture.detectChanges();

    service.appendViewContainer('newId', component.viewContainerRef);
    service.open('success', 'successfully');
    service.open('success', 'successfully');
    service.open('success', 'successfully');

    expect(service).toBeTruthy();
    tick(10000);
    fixture.detectChanges();

    (service as any)._createMessageItems('success', 'successfully');
    (service as any)._createMessageItems('success', 'successfully');
    tick(10000);

    service.destroyViewContainer('notFoundId');
    tick(10000);
    discardPeriodicTasks();
  }));
});
