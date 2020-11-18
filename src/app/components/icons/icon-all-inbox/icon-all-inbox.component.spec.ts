import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAllInboxComponent } from './icon-all-inbox.component';

describe('IconAllInboxComponent', () => {
  let component: IconAllInboxComponent;
  let fixture: ComponentFixture<IconAllInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconAllInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAllInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
