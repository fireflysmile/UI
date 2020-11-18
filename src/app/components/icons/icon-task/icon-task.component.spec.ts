import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTaskComponent } from './icon-task.component';

describe('IconTaskComponent', () => {
  let component: IconTaskComponent;
  let fixture: ComponentFixture<IconTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
