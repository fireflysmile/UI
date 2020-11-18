import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRouterItemComponent } from './tab-router-item.component';

describe('TabRouterItemComponent', () => {
  let component: TabRouterItemComponent;
  let fixture: ComponentFixture<TabRouterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRouterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRouterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
