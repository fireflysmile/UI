import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMlMemberDetailsPageComponent } from './ai-ml-member-details-page.component';

describe('AiMlMemberDetailsPageComponent', () => {
  let component: AiMlMemberDetailsPageComponent;
  let fixture: ComponentFixture<AiMlMemberDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiMlMemberDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiMlMemberDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
