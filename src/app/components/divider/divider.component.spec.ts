import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DividerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct size', () => {
    expect(component.width).toEqual('100%');
    component.length = 10;
    expect(component.width).toEqual('10px');
    expect(component.height).toEqual('1px');

    component.length = 0;
    component.direction = 'vertical';
    expect(component.width).toEqual('1px');
    expect(component.height).toEqual('100%');
    component.length = 10;
    expect(component.height).toEqual('10px');
  });
});
