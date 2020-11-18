import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let elemRef: ElementRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    elemRef = (component as any).elemRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set max height', () => {
    const testElement = { scrollHeight: 1000, style: { height: '' } };
    spyOn(elemRef.nativeElement, 'querySelector').and.callFake((query: string) =>
      query === '.modal-backdrop'
        ? {
            offsetHeight: 100,
          }
        : testElement
    );
    component.onResize();
    expect(testElement.style.height).toEqual('0px');
  });
});
