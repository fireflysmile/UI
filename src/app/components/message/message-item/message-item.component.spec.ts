import {
  async,
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { MessageItemComponent } from './message-item.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { Nl2brPipeModule } from 'src/app/pipes/nl2br-pipe/nl2br-pipe.module';

describe('MessageItemComponent', () => {
  let component: MessageItemComponent;
  let fixture: ComponentFixture<MessageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageItemComponent],
      imports: [TestSharedModule, Nl2brPipeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when finish count', fakeAsync(() => {
    const spyOnMessageClose = spyOn(component.messageClose, 'emit');
    component.count = 5;
    expect(component.count).toEqual(5);
    component.ngOnInit();
    tick(10000);
    expect(spyOnMessageClose).toHaveBeenCalled();
    component.ngOnDestroy();
    discardPeriodicTasks();
  }));
});
