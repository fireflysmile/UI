import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPeopleComponent } from './icon-people.component';

describe('IconPeopleComponent', () => {
  let component: IconPeopleComponent;
  let fixture: ComponentFixture<IconPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
