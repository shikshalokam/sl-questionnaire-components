import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../sl-questionnaire.service';

@Component({
  selector: 'sl-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
})
export class RadioInputComponent implements OnInit {
  @Input() options: any;
  @Input() questionnaireForm: FormGroup;
  @Input() question: Question;
  hintCloseText: string;
  @Output() dependentParent = new EventEmitter<Question>();
  isDimmed: any;
  hint: any;

  constructor(
    public qService: SlQuestionnaireService,
    public translate: SlTranslateService
  ) {}

  ngOnInit() {
    this.hintCloseText = this.translate['frmelmnts'].btn?.close;
    setTimeout(() => {
      this.questionnaireForm.addControl(
        this.question._id,
        new FormControl(
          this.question.value || null,
          this.qService.validate(this.question)
        )
      );

      this.question.startTime = this.question.startTime
        ? this.question.startTime
        : Date.now();
      if (this.question.value) {
        if (this.question.children.length) {
          this.dependentParent.emit(this.question);
        }
      }
    });
  }

  get isValid(): boolean {
    return this.questionnaireForm.controls[this.question._id].valid;
  }

  get isTouched(): boolean {
    return this.questionnaireForm.controls[this.question._id].touched;
  }

  onChange(value) {
    this.questionnaireForm.controls[this.question._id].setValue(value);
    this.question.value = value;
    this.question.endTime = Date.now();
    if (this.question.children.length) {
      this.dependentParent.emit(this.question);
    }
  }
}
