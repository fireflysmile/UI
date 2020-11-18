import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Nl2brPipeModule } from 'src/app/pipes/nl2br-pipe/nl2br-pipe.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { UnderReviewStatusItemComponent } from './under-review-status-item.component';

describe('UnderReviewStatusItemComponent', () => {
  let component: UnderReviewStatusItemComponent;
  let fixture: ComponentFixture<UnderReviewStatusItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnderReviewStatusItemComponent],
      imports: [TestSharedModule, Nl2brPipeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderReviewStatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set status', () => {
    component.status = 'pending';
    expect(component.pending).toEqual(true);
    expect(component.disabled).toEqual(false);
    expect(component.completed).toEqual(false);
  });
});
