import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { SuiModule } from 'ng2-semantic-ui-v9';
import { NumberInputComponent } from './number-input/number-input.component';
import { RangeInputComponent } from './range-input/range-input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { CheckboxInputComponent } from './checkbox-input/checkbox-input.component';
import { QuesRemarksComponent } from './ques-remarks/ques-remarks.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { InputComponent } from './input/input.component';
import { PageQuestionsComponent } from './page-questions/page-questions.component';
import { MatrixQuestionsComponent } from './matrix-questions/matrix-questions.component';

@NgModule({
  declarations: [
    TextInputComponent,
    DateInputComponent,
    NumberInputComponent,
    RangeInputComponent,
    RadioInputComponent,
    CheckboxInputComponent,
    QuesRemarksComponent,
    AttachmentComponent,
    InputComponent,
    PageQuestionsComponent,
    MatrixQuestionsComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SuiModule],
  exports: [
    TextInputComponent,
    DateInputComponent,
    NumberInputComponent,
    RangeInputComponent,
    RadioInputComponent,
    CheckboxInputComponent,
    QuesRemarksComponent,
    AttachmentComponent,
    InputComponent,
    PageQuestionsComponent,
    MatrixQuestionsComponent,
  ],
})
export class SlQuestionnaireModule {}
