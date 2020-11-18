import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatusBarComponent } from './request-status-bar.component';

describe('RequestStatusBarComponent', () => {
  let component: RequestStatusBarComponent;
  let fixture: ComponentFixture<RequestStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestStatusBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data', () => {
    component.data = [];
    expect(component.data.length).toEqual(0);
    component.data = null;
    expect(component.data.length).toEqual(0);
    component.data = [
      {
        label: 'string',
        subLabel: 'string',
        value: 10,
        color: 'string',
        width: 0,
      },
    ];
    expect(component.data.length).toEqual(1);
  });
});
