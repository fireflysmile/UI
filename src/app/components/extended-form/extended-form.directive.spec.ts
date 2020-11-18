import { Component, ViewChild, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtendedFormDirective } from './extended-form.directive';
import { By } from '@angular/platform-browser';
import { TestSharedModule } from 'src/app/test/test-shared.module';

@Component({
  template: `<form #form="extendedForm" appExtendedForm></form>`,
})
class TestDirectiveComponent {
  @ViewChild('form', { static: true }) element: ExtendedFormDirective;
}

describe('ExtendedFormDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, ExtendedFormDirective],
      imports: [TestSharedModule],
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.debugElement.query(By.css('form'));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    const spyOnSubmit = spyOn(component.element.validSubmit, 'emit');
    component.element.onHostSubmit();
    expect(spyOnSubmit).toHaveBeenCalled();
    spyOnSubmit.calls.reset();

    spyOnProperty(
      component.element.controlContainer,
      'invalid'
    ).and.returnValue(true);
    component.element.onHostSubmit();
    expect(spyOnSubmit).not.toHaveBeenCalled();

    component.element.controlContainer = null;
    component.element.onHostSubmit();
    expect(spyOnSubmit).not.toHaveBeenCalled();
    spyOnSubmit.calls.reset();
  });
});
