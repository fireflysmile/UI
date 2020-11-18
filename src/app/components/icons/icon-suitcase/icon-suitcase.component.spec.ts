import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSuitcaseComponent } from './icon-suitcase.component';

describe('IconSuitcaseComponent', () => {
  let component: IconSuitcaseComponent;
  let fixture: ComponentFixture<IconSuitcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSuitcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSuitcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
