import { __awaiter, __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ModalTemplate, SuiModalService, TemplateModalConfig, } from 'ng2-semantic-ui-v9';
import { SlTranslateService } from '../services/translate.service';
import * as _ from 'lodash-es';
import { SlUtilsService } from '../services/utils.service';
let MatrixQuestionsComponent = class MatrixQuestionsComponent {
    constructor(translate, modalService, fb, utils) {
        this.translate = translate;
        this.modalService = modalService;
        this.fb = fb;
        this.utils = utils;
    }
    ngOnInit() {
        this.addText = this.translate['frmelmnts'].btn.add;
        this.submitText = this.translate['frmelmnts'].btn.submit;
        this.cancelText = this.translate['frmelmnts'].btn.cancel;
        setTimeout(() => {
            this.matrixForm = this.fb.group({}, Validators.required);
            this.questionnaireForm.addControl(this.question._id, new FormArray([], [Validators.required]));
            this.initializeMatrix();
        });
    }
    initializeMatrix() {
        let valid = true;
        if (this.question.value.length) {
            this.question.value.map((v) => {
                let obj = {};
                v.forEach((ques) => {
                    if (!ques.value)
                        return;
                    obj[ques._id] = ques.value;
                });
                this.questionnaireForm.controls[this.question._id].push(new FormControl(obj));
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
    addInstances() {
        this.question.value = this.question.value ? this.question.value : [];
        this.question.value.push(JSON.parse(JSON.stringify(this.question.instanceQuestions)));
        this.matrixForm.reset();
        this.formAsArray.push(new FormControl([], [Validators.required]));
    }
    viewInstance(i) {
        this.matrixForm.reset();
        if (this.formAsArray.controls[i].value) {
            this.matrixForm.patchValue(this.formAsArray.controls[i].value);
        }
        const config = new TemplateModalConfig(this.modalTemplate);
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
        return this.questionnaireForm.controls[this.question._id];
    }
    matrixSubmit(index) {
        this.showBadgeAssingModel = false;
        this.formAsArray.at(index).patchValue(this.matrixForm.value);
        if (this.matrixForm.invalid) {
            this.formAsArray.at(index).setErrors({ err: 'Matrix reposne not valid' });
        }
    }
    deleteInstanceAlert(index) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const alertMeta = {
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
            this.questionnaireForm.controls[this.question._id].removeAt(index);
        });
    }
};
MatrixQuestionsComponent.ctorParameters = () => [
    { type: SlTranslateService },
    { type: SuiModalService },
    { type: FormBuilder },
    { type: SlUtilsService }
];
__decorate([
    Input()
], MatrixQuestionsComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], MatrixQuestionsComponent.prototype, "question", void 0);
__decorate([
    ViewChild('modalTemplate')
], MatrixQuestionsComponent.prototype, "modalTemplate", void 0);
MatrixQuestionsComponent = __decorate([
    Component({
        selector: 'sl-matrix-questions',
        template: "<div class=\"d-flex flex-jc-flex-end\">\n  <button class=\"sb-btn sb-btn-normal sb-btn-primary\" (click)=\"addInstances()\">\n    {{ addText }}\n    {{ question?.instanceIdentifier }}\n  </button>\n</div>\n<div\n  class=\"ui card student-card\"\n  *ngFor=\"let instance of question?.value; let i = index\"\n>\n  <div class=\"content flex-jc-space-between\">\n    <div (click)=\"viewInstance(i)\" style=\"flex: 1\">\n      <span> {{ question?.instanceIdentifier }} {{ i + 1 }}</span>\n      <!-- <span class=\"modified\" *ngIf=\"getLastModified(instance)\"\n      >Last Modified {{ \"todo\" }}</span\n    > -->\n      <!-- todo -->\n    </div>\n    <div>\n      <i class=\"trash large icon\" (click)=\"deleteInstanceAlert(i)\"></i>\n    </div>\n  </div>\n</div>\n\n<sui-modal\n  [mustScroll]=\"true\"\n  [isClosable]=\"true\"\n  [transitionDuration]=\"0\"\n  [size]=\"'normal'\"\n  class=\"sb-modal\"\n  appBodyScroll\n  (dismissed)=\"showBadgeAssingModel = false\"\n  *ngIf=\"showBadgeAssingModel\"\n  #modal\n>\n  <!--Header-->\n  <div class=\"sb-modal-header\">\n    {{ context?.heading }}\n  </div>\n  <!--/Header-->\n  <!--Content-->\n  <div class=\"sb-modal-content\">\n    <sl-input\n      [questions]=\"context.questions\"\n      [questionnaireForm]=\"matrixForm\"\n    ></sl-input>\n  </div>\n  <!--/Content-->\n\n  <!--Actions-->\n  <div class=\"sb-modal-actions\">\n    <button\n      [disabled]=\"!matrixForm?.valid\"\n      type=\"button\"\n      (click)=\"matrixSubmit(context.index)\"\n      [ngClass]=\"{\n        'sb-btn sb-btn-normal': true,\n        'sb-btn-primary': matrixForm?.valid,\n        'sb-btn-disabled': !matrixForm?.valid\n      }\"\n    >\n      {{ submitText }}\n    </button>\n    <button\n      class=\"sb-btn sb-btn-normal sb-btn-outline-primary\"\n      type=\"button\"\n      (click)=\"showBadgeAssingModel = false\"\n    >\n      {{ cancelText }}\n    </button>\n  </div>\n  <!--/Actions-->\n</sui-modal>\n",
        styles: [".card{width:100%;border-radius:90px}.content{display:flex;flex-direction:row}.ui.card>.content:after,.ui.cards>.card>.content:after{content:none}"]
    })
], MatrixQuestionsComponent);
export { MatrixQuestionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0cml4LXF1ZXN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL21hdHJpeC1xdWVzdGlvbnMvbWF0cml4LXF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxXQUFXLEVBQ1gsU0FBUyxFQUNULFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLG1CQUFtQixHQUNwQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sS0FBSyxDQUFDLE1BQU0sV0FBVyxDQUFDO0FBRS9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVkzRCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQVduQyxZQUNVLFNBQTZCLEVBQzlCLFlBQTZCLEVBQzdCLEVBQWUsRUFDZCxLQUFxQjtRQUhyQixjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFDN0IsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQzVCLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDekQsSUFBSSxD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U0FBUyxDQUFDLGVBQWUsQ0FBQzsrREFDbUM7QUFSbkQsd0JBQXdCO0lBTHBDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsbzZEQUFnRDs7S0FFakQsQ0FBQztHQUNXLHdCQUF3QixDQW9JcEM7U0FwSVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1BcnJheSxcbiAgRm9ybUJ1aWxkZXIsXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIE1vZGFsVGVtcGxhdGUsXG4gIFN1aU1vZGFsU2VydmljZSxcbiAgVGVtcGxhdGVNb2RhbENvbmZpZyxcbn0gZnJvbSAnbmcyLXNlbWFudGljLXVpLXY5JztcbmltcG9ydCB7IE1hdHJpeFF1ZXN0aW9uLCBRdWVzdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvcXVlc3Rpb25uYWlyZS50eXBlJztcbmltcG9ydCB7IFNsVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoLWVzJztcbmltcG9ydCB7IEFsZXJ0TWV0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYWxlcnQudHlwZSc7XG5pbXBvcnQgeyBTbFV0aWxzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxzLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb250ZXh0IHtcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuICBoZWFkaW5nOiBzdHJpbmc7XG4gIGluZGV4OiBudW1iZXI7XG59XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbC1tYXRyaXgtcXVlc3Rpb25zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdHJpeC1xdWVzdGlvbnMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXRyaXgtcXVlc3Rpb25zLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0cml4UXVlc3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgYWRkVGV4dDogc3RyaW5nO1xuICBzdWJtaXRUZXh0OiBzdHJpbmc7XG4gIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgcXVlc3Rpb25uYWlyZUZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgcXVlc3Rpb246IE1hdHJpeFF1ZXN0aW9uO1xuICBtYXRyaXhGb3JtOiBGb3JtR3JvdXA7XG4gIEBWaWV3Q2hpbGQoJ21vZGFsVGVtcGxhdGUnKVxuICBwdWJsaWMgbW9kYWxUZW1wbGF0ZTogTW9kYWxUZW1wbGF0ZTxJQ29udGV4dCwgc3RyaW5nLCBzdHJpbmc+O1xuICBjb250ZXh0OiBJQ29udGV4dDtcbiAgc2hvd0JhZGdlQXNzaW5nTW9kZWw6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBTbFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgcHVibGljIG1vZGFsU2VydmljZTogU3VpTW9kYWxTZXJ2aWNlLFxuICAgIHB1YmxpYyBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSB1dGlsczogU2xVdGlsc1NlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRkVGV4dCA9IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4uYWRkO1xuICAgIHRoaXMuc3VibWl0VGV4dCA9IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4uc3VibWl0O1xuICAgIHRoaXMuY2FuY2VsVGV4dCA9IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4uY2FuY2VsO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tYXRyaXhGb3JtID0gdGhpcy5mYi5ncm91cCh7fSwgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmFkZENvbnRyb2woXG4gICAgICAgIHRoaXMucXVlc3Rpb24uX2lkLFxuICAgICAgICBuZXcgRm9ybUFycmF5KFtdLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pXG4gICAgICApO1xuICAgICAgdGhpcy5pbml0aWFsaXplTWF0cml4KCk7XG4gICAgfSk7XG4gIH1cbiAgaW5pdGlhbGl6ZU1hdHJpeCgpIHtcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnF1ZXN0aW9uLnZhbHVlLmxlbmd0aCkge1xuICAgICAgdGhpcy5xdWVzdGlvbi52YWx1ZS5tYXAoKHYpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICB2LmZvckVhY2goKHF1ZXMpID0+IHtcbiAgICAgICAgICBpZiAoIXF1ZXMudmFsdWUpIHJldHVybjtcbiAgICAgICAgICBvYmpbcXVlcy5faWRdID0gcXVlcy52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgICh0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXSBhcyBGb3JtQXJyYXkpLnB1c2goXG4gICAgICAgICAgbmV3IEZvcm1Db250cm9sKG9iailcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKF8uaXNFbXB0eShvYmopKSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF2YWxpZClcbiAgICAgIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdLnNldEVycm9ycyh7XG4gICAgICAgIGVycjogJ01hdHJpeCByZXBvc25lIG5vdCB2YWxpZCcsXG4gICAgICB9KTtcbiAgfVxuXG4gIGFkZEluc3RhbmNlcygpOiB2b2lkIHtcbiAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlID0gdGhpcy5xdWVzdGlvbi52YWx1ZSA/IHRoaXMucXVlc3Rpb24udmFsdWUgOiBbXTtcbiAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlLnB1c2goXG4gICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucXVlc3Rpb24uaW5zdGFuY2VRdWVzdGlvbnMpKVxuICAgICk7XG4gICAgdGhpcy5tYXRyaXhGb3JtLnJlc2V0KCk7XG4gICAgdGhpcy5mb3JtQXNBcnJheS5wdXNoKG5ldyBGb3JtQ29udHJvbChbXSwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSk7XG4gIH1cblxuICB2aWV3SW5zdGFuY2UoaSk6IHZvaWQge1xuICAgIHRoaXMubWF0cml4Rm9ybS5yZXNldCgpO1xuICAgIGlmICh0aGlzLmZvcm1Bc0FycmF5LmNvbnRyb2xzW2ldLnZhbHVlKSB7XG4gICAgICB0aGlzLm1hdHJpeEZvcm0ucGF0Y2hWYWx1ZSh0aGlzLmZvcm1Bc0FycmF5LmNvbnRyb2xzW2ldLnZhbHVlKTtcbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0gbmV3IFRlbXBsYXRlTW9kYWxDb25maWc8SUNvbnRleHQsIHN0cmluZywgc3RyaW5nPihcbiAgICAgIHRoaXMubW9kYWxUZW1wbGF0ZVxuICAgICk7XG4gICAgY29uZmlnLmNsb3NlUmVzdWx0ID0gJ2Nsb3NlZCEnO1xuICAgIGNvbmZpZy5jb250ZXh0ID0ge1xuICAgICAgcXVlc3Rpb25zOiB0aGlzLnF1ZXN0aW9uLnZhbHVlW2ldLFxuICAgICAgaGVhZGluZzogYCR7dGhpcy5xdWVzdGlvbi5pbnN0YW5jZUlkZW50aWZpZXJ9ICR7aSArIDF9YCxcbiAgICAgIGluZGV4OiBpLFxuICAgIH07XG4gICAgdGhpcy5jb250ZXh0ID0gY29uZmlnLmNvbnRleHQ7XG4gICAgdGhpcy5zaG93QmFkZ2VBc3NpbmdNb2RlbCA9IHRydWU7XG4gIH1cblxuICBnZXQgZm9ybUFzQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdIGFzIEZvcm1BcnJheTtcbiAgfVxuXG4gIG1hdHJpeFN1Ym1pdChpbmRleCkge1xuICAgIHRoaXMuc2hvd0JhZGdlQXNzaW5nTW9kZWwgPSBmYWxzZTtcbiAgICB0aGlzLmZvcm1Bc0FycmF5LmF0KGluZGV4KS5wYXRjaFZhbHVlKHRoaXMubWF0cml4Rm9ybS52YWx1ZSk7XG4gICAgaWYgKHRoaXMubWF0cml4Rm9ybS5pbnZhbGlkKSB7XG4gICAgICB0aGlzLmZvcm1Bc0FycmF5LmF0KGluZGV4KS5zZXRFcnJvcnMoeyBlcnI6ICdNYXRyaXggcmVwb3NuZSBub3QgdmFsaWQnIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZUluc3RhbmNlQWxlcnQoaW5kZXgpIHtcbiAgICAvLyBsZXQgbWV0YURhdGEgPSBhd2FpdCB0aGlzLm9ic2VydmF0aW9uVXRpbFNlcnZpY2UuZ2V0QWxlcnRNZXRhRGF0YSgpO1xuICAgIC8vIG1ldGFEYXRhLmNvbnRlbnQuYm9keS5kYXRhID1cbiAgICAvLyAgIHRoaXMucmVzb3VyY2VTZXJ2aWNlLmZybWVsbW50cy5sYmwuZGVsZXRlU3VibWlzc2lvbjtcbiAgICAvLyBtZXRhRGF0YS5jb250ZW50LmJvZHkudHlwZSA9ICd0ZXh0JztcbiAgICAvLyBtZXRhRGF0YS5jb250ZW50LnRpdGxlID0gdGhpcy5yZXNvdXJjZVNlcnZpY2UuZnJtZWxtbnRzLmJ0bi5kZWxldGU7XG4gICAgLy8gbWV0YURhdGEuc2l6ZSA9ICdtaW5pJztcbiAgICAvLyBtZXRhRGF0YS5mb290ZXIuYnV0dG9ucy5wdXNoKHtcbiAgICAvLyAgIHR5cGU6ICdjYW5jZWwnLFxuICAgIC8vICAgcmV0dXJuVmFsdWU6IGZhbHNlLFxuICAgIC8vICAgYnV0dG9uVGV4dDogdGhpcy5yZXNvdXJjZVNlcnZpY2UuZnJtZWxtbnRzLmJ0bi5ubyxcbiAgICAvLyB9KTtcbiAgICAvLyBtZXRhRGF0YS5mb290ZXIuYnV0dG9ucy5wdXNoKHtcbiAgICAvLyAgIHR5cGU6ICdhY2NlcHQnLFxuICAgIC8vICAgcmV0dXJuVmFsdWU6IHRydWUsXG4gICAgLy8gICBidXR0b25UZXh0OiB0aGlzLnJlc291cmNlU2VydmljZS5mcm1lbG1udHMuYnRuLnllcyxcbiAgICAvLyB9KTtcbiAgICAvLyBtZXRhRGF0YS5mb290ZXIuY2xhc3NOYW1lID0gJ2RvdWJsZS1idG4nO1xuICAgIC8vIGNvbnN0IGFjY2VwdGVkID0gYXdhaXQgdGhpcy5vYnNlcnZhdGlvblV0aWxTZXJ2aWNlLnNob3dQb3B1cEFsZXJ0KG1ldGFEYXRhKTtcbiAgICBjb25zdCBhbGVydE1ldGE6IEFsZXJ0TWV0YSA9IHtcbiAgICAgIHRpdGxlOiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYWxlcnQudXBsb2FkVGVybXNSZWplY3RlZCxcbiAgICAgIHNpemU6ICdtaW5pJyxcbiAgICAgIGJvZHlUeXBlOiAndGV4dCcsXG4gICAgICBkYXRhOiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10ubGJsLmRlbGV0ZVN1Ym1pc3Npb24sXG4gICAgICBidXR0b25DbGFzczogJ2RvdWJsZS1idG4nLFxuICAgICAgYWNjZXB0VGV4dDogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi55ZXMsXG4gICAgICBjYW5jZWxUZXh0OiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuLm5vLFxuICAgIH07XG4gICAgY29uc3QgYWNjZXB0ZWQgPSB0aGlzLnV0aWxzLmFsZXJ0KGFsZXJ0TWV0YSk7XG4gICAgaWYgKCFhY2NlcHRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucXVlc3Rpb24udmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAodGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0gYXMgRm9ybUFycmF5KS5yZW1vdmVBdChcbiAgICAgIGluZGV4XG4gICAgKTtcbiAgfVxufVxuIl19