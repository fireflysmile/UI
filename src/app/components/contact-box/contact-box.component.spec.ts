import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AutoCloserModule } from '../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../auto-positioner/auto-positioner.module';
import { MoreOptionsModule } from '../more-options/more-options.module';

import { ContactBoxComponent } from './contact-box.component';

describe('ContactBoxComponent', () => {
  let component: ContactBoxComponent;
  let fixture: ComponentFixture<ContactBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactBoxComponent],
      imports: [TestSharedModule, AutoCloserModule, AutoPositionerModule, MoreOptionsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
