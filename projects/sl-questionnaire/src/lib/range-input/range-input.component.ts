import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { Question, Validation } from '../interfaces/questionnaire.type';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';

@Component({
  selector: 'sl-range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.scss'],
})
export class RangeInputComponent implements OnInit {
  @Input() questionnaireForm: UntypedFormGroup;
  @Input() question: Question;
  public options:Options={
    step:1,
    hidePointerLabels:true,
    hideLimitLabels:true,
    showSelectionBar:true
  };
  constructor(public qService: SlQuestionnaireService) {}

  ngOnInit() {
    setTimeout(() => {
      this.questionnaireForm.addControl(
        this.question._id,
        new UntypedFormControl(this.question.value || +this.min, [
          this.qService.validate(this.question),
        ])
      );
      this.question.startTime = this.question.startTime
        ? this.question.startTime
        : Date.now();
      this.question.value = this.question.value ? this.question.value : this.min;
    });
    this.max && (this.options['ceil'] = +this.max)
    this.min && (this.options['floor'] = +this.min)

    setTimeout(()=>{
      if(this.question.value){
        this.questionnaireForm.controls[this.question._id].reset(this.question.value);
      }else{
        if(((this.question.validation) as Validation).required){
            this.questionnaireForm.controls[this.question._id].reset(null);
        }
      }
    },100);
  }

  onChange(e) {
    let value = e.value;
    this.question.value = value;
    this.question.endTime = Date.now();
  }

  get isValid(): boolean {
    return this.questionnaireForm.controls[this.question._id].valid;
  }

  get isTouched(): boolean {
    return this.questionnaireForm.controls[this.question._id].touched;
  }

  get min() {
    if (typeof this.question.validation == 'string') {
      return null;
    }
    return this.question.validation.min;
  }

  get max() {
    if (typeof this.question.validation == 'string') {
      return null;
    }
    return this.question.validation.max;
  }
}
