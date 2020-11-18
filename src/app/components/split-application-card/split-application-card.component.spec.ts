import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Nl2brPipeModule } from 'src/app/pipes/nl2br-pipe/nl2br-pipe.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DividerModule } from '../divider/divider.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { SplitApplicationCardComponent } from './split-application-card.component';

describe('SplitApplicationCardComponent', () => {
  let component: SplitApplicationCardComponent;
  let fixture: ComponentFixture<SplitApplicationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplitApplicationCardComponent],
      imports: [TestSharedModule, Nl2brPipeModule, DividerModule, RectCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitApplicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
