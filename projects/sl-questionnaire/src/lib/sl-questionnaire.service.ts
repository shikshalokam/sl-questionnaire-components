import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  Evidence,
  Question,
  ResponseType,
} from './interfaces/questionnaire.type';

@Injectable({
  providedIn: 'root',
})
export class SlQuestionnaireService {
  private _submissionId: string;
  constructor() {}
  validate = (data: Question): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof data.validation == 'string') {
        return null;
      }
      if (!data.validation.required) {
        return null;
      }
      if (data.validation.regex) {
        const forbidden = this.testRegex(data.validation.regex, control.value);
        return forbidden ? null : { err: 'Invalid character found' };
      }

      if (data.validation.IsNumber) {
        if (!control.value) {
          return { err: 'Number not entered' };
        }
        const forbidden = !isNaN(control.value);
        return forbidden ? null : { err: 'Only numbers allowed' };
      }

      if (data.validation.required) {
        if (!control.value) {
          return { err: 'Required field' };
        }

        if (data.responseType == ResponseType.MULTISELECT) {
          return control.value.some((v) => v != '')
            ? null
            : { err: 'Select at least one option' };
        }

        if (data.responseType == ResponseType.SLIDER) {
          let min = data.validation.min;
          let max = data.validation.max;
          return min <= control.value && control.value <= max
            ? null
            : { err: 'Selected value  not within range' };
        }
      }
    };
  };

  public testRegex(regexExpression: RegExp, value: string): boolean {
    const regex = new RegExp(regexExpression);
    return regex.test(value);
  }

  setSubmissionId(submissionId: any) {
    this._submissionId = submissionId;
  }
  getSubmissionId() {
    return this._submissionId;
  }
}
