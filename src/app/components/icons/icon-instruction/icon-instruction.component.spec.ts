import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconInstructionComponent } from './icon-instruction.component';

describe('IconInstructionComponent', () => {
  let component: IconInstructionComponent;
  let fixture: ComponentFixture<IconInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
