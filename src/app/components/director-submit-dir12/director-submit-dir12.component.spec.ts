import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { DirectorSubmitDir12ItemModule } from '../director-submit-dir12-item/director-submit-dir12-item.module';

import { DirectorSubmitDir12Component } from './director-submit-dir12.component';

describe('DirectorSubmitDir12Component', () => {
  let component: DirectorSubmitDir12Component;
  let fixture: ComponentFixture<DirectorSubmitDir12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorSubmitDir12Component],
      imports: [DirectorSubmitDir12ItemModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorSubmitDir12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create directors', () => {
    component.directors = null;
    expect(component.directors.length).toEqual(0);
    component.directors = [
      {
        name: 'name',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: {
          name: 'file name',
          url: 'file url',
        },
      },
      {
        name: 'name',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: null,
      },
    ];
    fixture.detectChanges();
    component.checkChanges();
    expect(component.directors.length).toEqual(2);
  });
});
