import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconProtectionComponent } from './icon-protection.component';

describe('IconProtectionComponent', () => {
  let component: IconProtectionComponent;
  let fixture: ComponentFixture<IconProtectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconProtectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
