import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDnsComponent } from './icon-dns.component';

describe('IconDnsComponent', () => {
  let component: IconDnsComponent;
  let fixture: ComponentFixture<IconDnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconDnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
