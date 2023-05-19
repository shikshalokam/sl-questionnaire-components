import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';

@Component({
  selector: 'sl-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
})
export class CheckboxInputComponent implements OnInit {
  @Input() options;
  @Input() questionnaireForm: UntypedFormGroup;
  @Input() question: Question;
  hintCloseText: string;
  hintModalNote:string
  @Output() dependentParent = new EventEmitter<Question>();
  isDimmed: any;
  hint: any;
  constructor(
    public qService: SlQuestionnaireService,
    public translate: SlTranslateService
  ) {}

  ngOnInit() {
    this.hintCloseText = this.translate['frmelmnts'].btn?.close;
    this.hintModalNote = this.translate['frmelmnts'].lbl?.hintModalNote;
    setTimeout(() => {
      const optionControl = this.options.map((v) => {
        if (
          this.question.value &&
          (this.question.value as Array<string>).find((_v) => _v == v.value)
        ) {
          return new UntypedFormControl(v.value);
        }
        return new UntypedFormControl('');
      });

      this.questionnaireForm.addControl(
        this.question._id,
        new UntypedFormArray(optionControl, this.qService.validate(this.question))
      );

      this.question.startTime = this.question.startTime
        ? this.question.startTime
        : Date.now();
      if (this.question.value.length) {
        if (this.question.children.length) {
          this.dependentParent.emit(this.question);
        }
      }
    });
  }

  onChange(oId: string, isChecked: boolean, oIndex: number) {
    const formArray: UntypedFormArray = this.questionnaireForm.get(
      this.question._id
    ) as UntypedFormArray;
    if (isChecked) {
      formArray.controls[oIndex].patchValue(oId);
    }
    this.question.value =
      this.questionnaireForm.controls[this.question._id].value;
    this.question.value = (this.question.value as Array<string>).filter(
      Boolean
    );
    this.question.endTime = Date.now();
    if (this.question.children.length) {
      this.dependentParent.emit(this.question);
    }
  }

  get isValid(): boolean {
    return this.questionnaireForm.controls[this.question._id].valid;
  }

  get isTouched(): boolean {
    return this.questionnaireForm.controls[this.question._id].touched;
  }

  closeHint(){
    this.isDimmed = false;
  }
}
