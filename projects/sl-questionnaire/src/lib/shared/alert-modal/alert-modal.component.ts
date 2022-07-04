import { Component, Input, OnInit } from '@angular/core';
import { SlTranslateService } from '../../services/translate.service';

@Component({
  selector: 'sl-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  @Input() isDimmed;
  @Input() hint;
  hintCloseText: string;
  hintModalNote:string
  constructor(
    public translate: SlTranslateService
  ) { }

  ngOnInit(){
    this.hintCloseText = this.translate['frmelmnts'].btn?.close;
    this.hintModalNote = this.translate['frmelmnts'].lbl?.hintModalNote;
  }

}
