import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { PostFactoAttentionAlertComponent } from './post-facto-attention-alert.component';

describe('PostFactoAttentionAlertComponent', () => {
  let component: PostFactoAttentionAlertComponent;
  let fixture: ComponentFixture<PostFactoAttentionAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostFactoAttentionAlertComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFactoAttentionAlertComponent);
    component = fixture.componentInstance;
    component.postFactoChanges = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
