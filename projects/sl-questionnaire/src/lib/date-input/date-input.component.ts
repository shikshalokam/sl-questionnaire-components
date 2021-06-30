import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question, Validation } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';

@Component({
  selector: 'sl-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent implements OnInit {
  date: any;
  min: Date;
  max: Date;

  @Input() questionnaireForm: FormGroup;
  @Input() question: Question;
  @Input() autoCaptureText: String;

  constructor(
    private qService: SlQuestionnaireService,
    private translate: SlTranslateService
  ) {}

  ngOnInit() {
    this.autoCaptureText = this.translate['frmelmnts'].btn?.autoCapture;
    setTimeout(() => {
      this.questionnaireForm.addControl(
        this.question._id,
        new FormControl(
          this.question.value ? new Date(this.question.value as string) : null,
          [this.qService.validate(this.question)]
        )
      );

      this.question.startTime = this.question.startTime
        ? this.question.startTime
        : Date.now();
    });
    this.min = (this.question.validation as Validation).min
      ? new Date((this.question.validation as Validation).min)
      : null;
    this.max = (this.question.validation as Validation).max
      ? new Date((this.question.validation as Validation).max)
      : null;
  }

  onChange(e: string) {
    let value = e;
    this.question.value = value;
    this.question.endTime = Date.now();
  }

  autoCapture() {
    this.questionnaireForm.controls[this.question._id].patchValue(
      new Date(Date.now())
    );
  }
}
