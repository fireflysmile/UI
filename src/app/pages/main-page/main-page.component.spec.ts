import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderModule } from 'src/app/components/header/header.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      imports: [HeaderModule, SidebarModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
