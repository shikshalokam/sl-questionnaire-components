import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ModalTemplate,
  SuiModalService,
  TemplateModalConfig,
} from 'ng2-semantic-ui-v9';
import { MatrixQuestion, Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import * as _ from 'lodash-es';
import { AlertMeta } from '../interfaces/alert.type';
import { SlUtilsService } from '../services/utils.service';

export interface IContext {
  questions: Question[];
  heading: string;
  index: number;
}
@Component({
  selector: 'sl-matrix-questions',
  templateUrl: './matrix-questions.component.html',
  styleUrls: ['./matrix-questions.component.css'],
})
export class MatrixQuestionsComponent implements OnInit {
  addText: string;
  submitText: string;
  cancelText: string;
  @Input() questionnaireForm: FormGroup;
  @Input() question: MatrixQuestion;
  matrixForm: FormGroup;
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  context: IContext;
  showBadgeAssingModel: boolean;
  constructor(
    private translate: SlTranslateService,
    public modalService: SuiModalService,
    public fb: FormBuilder,
    private utils: SlUtilsService
  ) {}

  ngOnInit(): void {
    this.addText = this.translate['frmelmnts'].btn.add;
    this.submitText = this.translate['frmelmnts'].btn.submit;
    this.cancelText = this.translate['frmelmnts'].btn.cancel;
    setTimeout(() => {
      this.matrixForm = this.fb.group({}, Validators.required);
      this.questionnaireForm.addControl(
        this.question._id,
        new FormArray([], [Validators.required])
      );
      this.initializeMatrix();
    });
  }
  initializeMatrix() {
    let valid = true;
    if (this.question.value.length) {
      this.question.value.map((v) => {
        let obj = {};
        v.forEach((ques) => {
          if (!ques.value) return;
          obj[ques._id] = ques.value;
        });
        (this.questionnaireForm.controls[this.question._id] as FormArray).push(
          new FormControl(obj)
        );
        if (_.isEmpty(obj)) {
          valid = false;
        }
      });
    }

    if (!valid)
      this.questionnaireForm.controls[this.question._id].setErrors({
        err: 'Matrix reposne not valid',
      });
  }

  addInstances(): void {
    this.question.value = this.question.value ? this.question.value : [];
    this.question.value.push(
      JSON.parse(JSON.stringify(this.question.instanceQuestions))
    );
    this.matrixForm.reset();
    this.formAsArray.push(new FormControl([], [Validators.required]));
  }

  viewInstance(i): void {
    this.matrixForm.reset();
    if (this.formAsArray.controls[i].value) {
      this.matrixForm.patchValue(this.formAsArray.controls[i].value);
    }
    const config = new TemplateModalConfig<IContext, string, string>(
      this.modalTemplate
    );
    config.closeResult = 'closed!';
    config.context = {
      questions: this.question.value[i],
      heading: `${this.question.instanceIdentifier} ${i + 1}`,
      index: i,
    };
    this.context = config.context;
    this.showBadgeAssingModel = true;
  }

  get formAsArray() {
    return this.questionnaireForm.controls[this.question._id] as FormArray;
  }

  matrixSubmit(index) {
    this.showBadgeAssingModel = false;
    this.formAsArray.at(index).patchValue(this.matrixForm.value);
    if (this.matrixForm.invalid) {
      this.formAsArray.at(index).setErrors({ err: 'Matrix reposne not valid' });
    }
  }

  async deleteInstanceAlert(index) {
    // let metaData = await this.observationUtilService.getAlertMetaData();
    // metaData.content.body.data =
    //   this.resourceService.frmelmnts.lbl.deleteSubmission;
    // metaData.content.body.type = 'text';
    // metaData.content.title = this.resourceService.frmelmnts.btn.delete;
    // metaData.size = 'mini';
    // metaData.footer.buttons.push({
    //   type: 'cancel',
    //   returnValue: false,
    //   buttonText: this.resourceService.frmelmnts.btn.no,
    // });
    // metaData.footer.buttons.push({
    //   type: 'accept',
    //   returnValue: true,
    //   buttonText: this.resourceService.frmelmnts.btn.yes,
    // });
    // metaData.footer.className = 'double-btn';
    // const accepted = await this.observationUtilService.showPopupAlert(metaData);
    const alertMeta: AlertMeta = {
      title: this.translate['frmelmnts'].alert.uploadTermsRejected,
      size: 'mini',
      bodyType: 'text',
      data: this.translate['frmelmnts'].lbl.deleteSubmission,
      buttonClass: 'double-btn',
      acceptText: this.translate['frmelmnts'].btn.yes,
      cancelText: this.translate['frmelmnts'].btn.no,
    };
    const accepted = this.utils.alert(alertMeta);
    if (!accepted) {
      return;
    }

    this.question.value.splice(index, 1);
    (this.questionnaireForm.controls[this.question._id] as FormArray).removeAt(
      index
    );
  }
}
