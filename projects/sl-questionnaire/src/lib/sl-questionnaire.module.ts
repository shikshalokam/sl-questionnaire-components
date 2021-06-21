import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlQuestionnaireComponent } from './sl-questionnaire.component';
import { TextInputComponent } from './text-input/text-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { SuiModule } from 'ng2-semantic-ui-v9';
import { NumberInputComponent } from './number-input/number-input.component';
import { RangeInputComponent } from './range-input/range-input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { CheckboxInputComponent } from './checkbox-input/checkbox-input.component';

@NgModule({
  declarations: [
    SlQuestionnaireComponent,
    TextInputComponent,
    DateInputComponent,
    NumberInputComponent,
    RangeInputComponent,
    RadioInputComponent,
    CheckboxInputComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SuiModule],
  exports: [
    SlQuestionnaireComponent,
    TextInputComponent,
    DateInputComponent,
    NumberInputComponent,
    RangeInputComponent,
    RadioInputComponent,
    CheckboxInputComponent
  ],
})
export class SlQuestionnaireModule {}
