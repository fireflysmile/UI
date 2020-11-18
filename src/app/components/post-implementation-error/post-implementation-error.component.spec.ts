import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { PostImplementationErrorComponent } from './post-implementation-error.component';

describe('PostImplementationErrorComponent', () => {
  let component: PostImplementationErrorComponent;
  let fixture: ComponentFixture<PostImplementationErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostImplementationErrorComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImplementationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
