import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconThInfoComponent } from './icon-th-info.component';

describe('IconThInfoComponent', () => {
  let component: IconThInfoComponent;
  let fixture: ComponentFixture<IconThInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconThInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconThInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
