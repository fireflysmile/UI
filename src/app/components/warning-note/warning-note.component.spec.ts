import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { WarningNoteComponent } from './warning-note.component';

describe('WarningNoteComponent', () => {
  let component: WarningNoteComponent;
  let fixture: ComponentFixture<WarningNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarningNoteComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
