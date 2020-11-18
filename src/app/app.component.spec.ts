import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestSharedModule } from './test/test-shared.module';
import { HeaderModule } from './components/header/header.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { MessageModule } from './components/message/message.module';
import { ModalModule } from './components/modal/modal.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [TestSharedModule, HeaderModule, SidebarModule, MessageModule, ModalModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
