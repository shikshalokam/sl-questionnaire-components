import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';

@Component({
  selector: 'sl-ques-remarks',
  templateUrl: './ques-remarks.component.html',
  styleUrls: ['./ques-remarks.component.scss'],
})
export class QuesRemarksComponent implements OnInit {
  remark = '';
  showRemarks;

  @Output() saveClicked = new EventEmitter();
  @Input() question: Question;
  title: String;
  remarksAddText: String;
  constructor(private translate: SlTranslateService) {}

  ngOnInit() {
    this.title = this.translate['frmelmnts'].lbl?.remark_title;
    this.remarksAddText = this.translate['frmelmnts'].btn.add;
    this.remark = this.question.remarks;
    this.remark ? (this.showRemarks = true) : false;
  }
  saveRemark() {
    this.question.remarks = this.remark;
    this.saveClicked.emit({ value: this.remark });
  }

  deleteRemark() {
    this.remark = '';
    this.saveRemark();
    this.showRemarks = false;
  }
}
