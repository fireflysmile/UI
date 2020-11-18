import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextAddComponent } from './icon-text-add.component';

describe('IconTextAddComponent', () => {
  let component: IconTextAddComponent;
  let fixture: ComponentFixture<IconTextAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconTextAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTextAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
