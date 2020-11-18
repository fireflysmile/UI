import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRefreshComponent } from './icon-refresh.component';

describe('IconRefreshComponent', () => {
  let component: IconRefreshComponent;
  let fixture: ComponentFixture<IconRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
