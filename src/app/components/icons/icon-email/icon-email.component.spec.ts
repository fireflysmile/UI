import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEmailComponent } from './icon-email.component';

describe('IconEmailComponent', () => {
  let component: IconEmailComponent;
  let fixture: ComponentFixture<IconEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
