import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSearchDocComponent } from './icon-search-doc.component';

describe('IconSearchDocComponent', () => {
  let component: IconSearchDocComponent;
  let fixture: ComponentFixture<IconSearchDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSearchDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSearchDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
