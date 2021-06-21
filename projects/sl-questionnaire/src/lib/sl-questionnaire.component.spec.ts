import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlQuestionnaireComponent } from './sl-questionnaire.component';

describe('SlQuestionnaireComponent', () => {
  let component: SlQuestionnaireComponent;
  let fixture: ComponentFixture<SlQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
