import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertMeta } from '../interfaces/alert.type';
import { SlTranslateService } from '../services/translate.service';
import { SlUtilsService } from '../services/utils.service';

@Component({
  selector: 'sl-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent implements OnInit {
  @Input() data;
  files:string;
  formData;
  constructor(
    private translate: SlTranslateService,
    private utils: SlUtilsService
  ) {}

  ngOnInit(){
    this.files = this.translate['frmelmnts'].lbl?.files;
  }

  basicUpload(event) {
    const files: FileList = event.target.files;
    let sizeMB = +(files[0].size / 1000 / 1000).toFixed(4);
    if (sizeMB > 20) {
      this.fileLimitCross();
      return;
    }
    this.formData = new FormData();
    Array.from(files).forEach((f) => this.formData.append('file', f));
    event.target.value = null;
    this.preSignedUrl(this.getFileNames(this.formData));
  }

  fileLimitCross() {
    const alertMeta: AlertMeta = {
      size: 'tiny',
      bodyType: 'text',
      data: this.translate['frmelmnts'].lbl.fileLimitCross20,
      buttonClass: 'single-btn',
      acceptText: this.translate['frmelmnts'].btn.ok,
      cancelText: null,
    };
    this.utils.alert(alertMeta);
  }

  getFileNames(formData) {
    let files = [];
    formData.forEach((element) => {
      files.push(element.name);
    });
    return files;
  }

  preSignedUrl(files) {
    let payload = {};
    payload['ref'] = 'survey';
    payload['request'] = {};
    payload['request'][this.data.submissionId] = {
      files: files,
    };
    this.utils.getPreSingedUrls(payload).subscribe(
      (imageData) => {
        const presignedUrlData =
          imageData['result'][this.data.submissionId].files[0];
        this.formData.append('url', presignedUrlData.url);
        this.utils.cloudStorageUpload(this.formData).subscribe(
          (success: any) => {
            if (success.status === 200) {
              const obj = {
                name: this.getFileNames(this.formData)[0],
                url: presignedUrlData.url.split('?')[0],
              };
              for (const key of Object.keys(presignedUrlData.payload)) {
                obj[key] = presignedUrlData['payload'][key];
              }
              this.data.files.push(obj);
              const alertMeta: AlertMeta = {
                size: 'tiny',
                bodyType: 'text',
                data: this.translate['frmelmnts'].lbl.evidenceUploaded,
                buttonClass: 'single-btn',
                acceptText: this.translate['frmelmnts'].btn.ok,
                cancelText: null,
                type: 'uploaded',
              };
              this.utils.alert(alertMeta);
            } else {
              this.utils.error(
                this.translate['frmelmnts'].message.unableToUpload
              );
            }
          },
          (error) => {
            this.utils.error(
              this.translate['frmelmnts'].message.unableToUpload
            );
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  extension(name) {
    return name.split('.').pop();
  }
  openFile(file) {
    window.open(file.url, '_blank');
  }

  async deleteAttachment(fileIndex) {
    const alertMeta: AlertMeta = {
      size: 'mini',
      bodyType: 'text',
      data: this.translate['frmelmnts'].lbl.confirmEvidenceDelete,
      buttonClass: 'double-btn',
      acceptText: this.translate['frmelmnts'].btn.yes,
      cancelText: this.translate['frmelmnts'].btn.no,
    };
    const accepted = await this.utils.alert(alertMeta);

    if (!accepted) {
      return;
    }
    this.data.files.splice(fileIndex, 1);
  }

  async onAddApproval(file) {
    let html = `
    ${this.translate['frmelmnts'].lbl.evidence_content_policy}<a href='/term-of-use.html' target="_blank">${this.translate['frmelmnts'].lbl.evidence_content_policy_label}</a> .${this.translate['frmelmnts'].lbl.uploadevidencecontent}
    `;
    const alertMeta: AlertMeta = {
      size: 'tiny',
      bodyType: 'checkbox',
      data: html,
      buttonClass: 'double-btn',
      acceptText: this.translate['frmelmnts'].btn.upload,
      cancelText: this.translate['frmelmnts'].btn.donotupload,
    };
    let returnData = await this.utils.alert(alertMeta);
    if (returnData == false) {
      this.notAccepted();
      return;
    }
    if (returnData == true) {
      file.click();
    }
  }

  notAccepted(): void {
    const alertMeta: AlertMeta = {
      size: 'tiny',
      bodyType: 'text',
      data: this.translate['frmelmnts'].lbl.uploadTermsRejected,
      buttonClass: 'single-btn',
      acceptText: this.translate['frmelmnts'].btn.ok,
      cancelText: null,
      type: 'notAccepted',
    };
    this.utils.alert(alertMeta);
  }
}
