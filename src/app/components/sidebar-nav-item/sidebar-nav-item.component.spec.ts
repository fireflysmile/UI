import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavItemComponent } from './sidebar-nav-item.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';

describe('SidebarNavItemComponent', () => {
  let component: SidebarNavItemComponent;
  let fixture: ComponentFixture<SidebarNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarNavItemComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
