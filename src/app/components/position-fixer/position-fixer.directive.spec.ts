import { PositionFixerDirective } from './position-fixer.directive';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

@Component({
  template: `<div #cdire="appPositionFixerDirective" appPositionFixer></div>`,
})
class TestDirectiveComponent {
  @ViewChild('cdire', { static: true }) element: PositionFixerDirective;
}

describe('PositionFixerDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let elementRef: DebugElement;
  const event = {};
  let positionChange;
  let appService: AppService;

  beforeEach(() => {
    document.addEventListener = (eventName, action) => {
      event[eventName] = action;
    };
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, PositionFixerDirective],
      imports: [TestSharedModule],
    });
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.debugElement.query(By.css('div'));
    component.element.reposition = true;
    window.requestAnimationFrame = (_observePositionChange) => {
      positionChange = _observePositionChange;
      return 0;
    };
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should update element position if turn on/off reposition', () => {
    component.element.ngAfterViewInit();
    positionChange();
    component.element.reposition = false;
    component.element.onWindowScroll();
    component.element.onWindowWheel();
    component.element.onWindowResize();
    expect(elementRef.styles.left).toEqual('0px');
    expect(elementRef.styles.position).toEqual('fixed');
    component.element.reposition = true;
    component.element.fixSize = false;
    component.element.ngAfterViewInit();
    component.element.onWindowScroll();
    fixture.detectChanges();
    fixture.detectChanges();
    expect(elementRef.styles.left).toEqual('0px');
    expect(elementRef.styles.position).toEqual('fixed');
    component.element.fixSize = true;
    component.element.ngAfterViewInit();
    component.element.onWindowScroll();
    fixture.detectChanges();
    fixture.detectChanges();
    expect(elementRef.styles.left).toEqual('0px');
    expect(elementRef.styles.position).toEqual('fixed');
    expect(elementRef.styles.height).toEqual('0px');

    (component.element as any).elementRef.nativeElement = null;
    component.element.onWindowScroll();
    component.element.ngAfterViewInit();
    expect(elementRef.styles.height).toEqual('0px');
  });
});
