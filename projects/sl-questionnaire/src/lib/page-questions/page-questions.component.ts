import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageQuestion } from '../interfaces/questionnaire.type';

@Component({
  selector: 'sl-page-questions',
  templateUrl: './page-questions.component.html',
  styleUrls: ['./page-questions.component.css'],
})
export class PageQuestionsComponent implements OnInit {
  @Input() questionnaireForm: FormGroup;
  @Input() question: PageQuestion;
  constructor() {}

  ngOnInit(): void {}
}
