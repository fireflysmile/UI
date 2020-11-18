import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RectCardModule } from 'src/app/components/rect-card/rect-card.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { SettingsDefaultPageComponent } from './settings-default-page.component';

describe('SettingsDefaultPageComponent', () => {
  let component: SettingsDefaultPageComponent;
  let fixture: ComponentFixture<SettingsDefaultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDefaultPageComponent],
      imports: [TestSharedModule, RectCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDefaultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
