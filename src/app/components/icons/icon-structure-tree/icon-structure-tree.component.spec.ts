import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStructureTreeComponent } from './icon-structure-tree.component';

describe('IconStructureTreeComponent', () => {
  let component: IconStructureTreeComponent;
  let fixture: ComponentFixture<IconStructureTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconStructureTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconStructureTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
