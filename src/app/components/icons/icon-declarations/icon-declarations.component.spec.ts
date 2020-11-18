import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDeclarationsComponent } from './icon-declarations.component';

describe('IconDeclarationsComponent', () => {
  let component: IconDeclarationsComponent;
  let fixture: ComponentFixture<IconDeclarationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconDeclarationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
