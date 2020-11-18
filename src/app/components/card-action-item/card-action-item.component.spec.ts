import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { CardActionItemComponent } from './card-action-item.component';

describe('CardActionItemComponent', () => {
  let component: CardActionItemComponent;
  let fixture: ComponentFixture<CardActionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardActionItemComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
