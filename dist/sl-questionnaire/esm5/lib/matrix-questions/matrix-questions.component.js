import { __awaiter, __decorate, __generator } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ModalTemplate, SuiModalService, TemplateModalConfig, } from 'ng2-semantic-ui-v9';
import { SlTranslateService } from '../services/translate.service';
import * as _ from 'lodash-es';
import { SlUtilsService } from '../services/utils.service';
var MatrixQuestionsComponent = /** @class */ (function () {
    function MatrixQuestionsComponent(translate, modalService, fb, utils) {
        this.translate = translate;
        this.modalService = modalService;
        this.fb = fb;
        this.utils = utils;
    }
    MatrixQuestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addText = this.translate['frmelmnts'].btn.add;
        this.submitText = this.translate['frmelmnts'].btn.submit;
        this.cancelText = this.translate['frmelmnts'].btn.cancel;
        setTimeout(function () {
            _this.matrixForm = _this.fb.group({}, Validators.required);
            _this.questionnaireForm.addControl(_this.question._id, new FormArray([], [Validators.required]));
            _this.initializeMatrix();
        });
    };
    MatrixQuestionsComponent.prototype.initializeMatrix = function () {
        var _this = this;
        var valid = true;
        if (this.question.value.length) {
            this.question.value.map(function (v) {
                var obj = {};
                v.forEach(function (ques) {
                    if (!ques.value)
                        return;
                    obj[ques._id] = ques.value;
                });
                _this.questionnaireForm.controls[_this.question._id].push(new FormControl(obj));
                if (_.isEmpty(obj)) {
                    valid = false;
                }
            });
        }
        if (!valid)
            this.questionnaireForm.controls[this.question._id].setErrors({
                err: 'Matrix reposne not valid',
            });
    };
    MatrixQuestionsComponent.prototype.addInstances = function () {
        this.question.value = this.question.value ? this.question.value : [];
        this.question.value.push(JSON.parse(JSON.stringify(this.question.instanceQuestions)));
        this.matrixForm.reset();
        this.formAsArray.push(new FormControl([], [Validators.required]));
    };
    MatrixQuestionsComponent.prototype.viewInstance = function (i) {
        this.matrixForm.reset();
        if (this.formAsArray.controls[i].value) {
            this.matrixForm.patchValue(this.formAsArray.controls[i].value);
        }
        var config = new TemplateModalConfig(this.modalTemplate);
        config.closeResult = 'closed!';
        config.context = {
            questions: this.question.value[i],
            heading: this.question.instanceIdentifier + " " + (i + 1),
            index: i,
        };
        this.context = config.context;
        this.showBadgeAssingModel = true;
    };
    Object.defineProperty(MatrixQuestionsComponent.prototype, "formAsArray", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id];
        },
        enumerable: true,
        configurable: true
    });
    MatrixQuestionsComponent.prototype.matrixSubmit = function (index) {
        this.showBadgeAssingModel = false;
        this.formAsArray.at(index).patchValue(this.matrixForm.value);
        if (this.matrixForm.invalid) {
            this.formAsArray.at(index).setErrors({ err: 'Matrix reposne not valid' });
        }
    };
    MatrixQuestionsComponent.prototype.deleteInstanceAlert = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var alertMeta, accepted;
            return __generator(this, function (_a) {
                alertMeta = {
                    title: this.translate['frmelmnts'].alert.uploadTermsRejected,
                    size: 'mini',
                    bodyType: 'text',
                    data: this.translate['frmelmnts'].lbl.deleteSubmission,
                    buttonClass: 'double-btn',
                    acceptText: this.translate['frmelmnts'].btn.yes,
                    cancelText: this.translate['frmelmnts'].btn.no,
                };
                accepted = this.utils.alert(alertMeta);
                if (!accepted) {
                    return [2 /*return*/];
                }
                this.question.value.splice(index, 1);
                this.questionnaireForm.controls[this.question._id].removeAt(index);
                return [2 /*return*/];
            });
        });
    };
    MatrixQuestionsComponent.ctorParameters = function () { return [
        { type: SlTranslateService },
        { type: SuiModalService },
        { type: FormBuilder },
        { type: SlUtilsService }
    ]; };
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
    return MatrixQuestionsComponent;
}());
export { MatrixQuestionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0cml4LXF1ZXN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL21hdHJpeC1xdWVzdGlvbnMvbWF0cml4LXF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxXQUFXLEVBQ1gsU0FBUyxFQUNULFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLG1CQUFtQixHQUNwQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sS0FBSyxDQUFDLE1BQU0sV0FBVyxDQUFDO0FBRS9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVkzRDtJQVdFLGtDQUNVLFNBQTZCLEVBQzlCLFlBQTZCLEVBQzdCLEVBQWUsRUFDZCxLQUFxQjtRQUhyQixjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFDN0IsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQzVCLENBQUM7SUFFSiwyQ0FBUSxHQUFSO1FBQUEsaUJBWUM7UUFYQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNuRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFH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ZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGb3JtQXJyYXksXG4gIEZvcm1CdWlsZGVyLFxuICBGb3JtQ29udHJvbCxcbiAgRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBNb2RhbFRlbXBsYXRlLFxuICBTdWlNb2RhbFNlcnZpY2UsXG4gIFRlbXBsYXRlTW9kYWxDb25maWcsXG59IGZyb20gJ25nMi1zZW1hbnRpYy11aS12OSc7XG5pbXBvcnQgeyBNYXRyaXhRdWVzdGlvbiwgUXVlc3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5pbXBvcnQgeyBTbFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmFuc2xhdGUuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyBBbGVydE1ldGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FsZXJ0LnR5cGUnO1xuaW1wb3J0IHsgU2xVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ29udGV4dCB7XG4gIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcbiAgaGVhZGluZzogc3RyaW5nO1xuICBpbmRleDogbnVtYmVyO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2wtbWF0cml4LXF1ZXN0aW9ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXRyaXgtcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWF0cml4LXF1ZXN0aW9ucy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdHJpeFF1ZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGFkZFRleHQ6IHN0cmluZztcbiAgc3VibWl0VGV4dDogc3RyaW5nO1xuICBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHF1ZXN0aW9ubmFpcmVGb3JtOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIHF1ZXN0aW9uOiBNYXRyaXhRdWVzdGlvbjtcbiAgbWF0cml4Rm9ybTogRm9ybUdyb3VwO1xuICBAVmlld0NoaWxkKCdtb2RhbFRlbXBsYXRlJylcbiAgcHVibGljIG1vZGFsVGVtcGxhdGU6IE1vZGFsVGVtcGxhdGU8SUNvbnRleHQsIHN0cmluZywgc3RyaW5nPjtcbiAgY29udGV4dDogSUNvbnRleHQ7XG4gIHNob3dCYWRnZUFzc2luZ01vZGVsOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogU2xUcmFuc2xhdGVTZXJ2aWNlLFxuICAgIHB1YmxpYyBtb2RhbFNlcnZpY2U6IFN1aU1vZGFsU2VydmljZSxcbiAgICBwdWJsaWMgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgdXRpbHM6IFNsVXRpbHNTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFRleHQgPSB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuLmFkZDtcbiAgICB0aGlzLnN1Ym1pdFRleHQgPSB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuLnN1Ym1pdDtcbiAgICB0aGlzLmNhbmNlbFRleHQgPSB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuLmNhbmNlbDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubWF0cml4Rm9ybSA9IHRoaXMuZmIuZ3JvdXAoe30sIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5hZGRDb250cm9sKFxuICAgICAgICB0aGlzLnF1ZXN0aW9uLl9pZCxcbiAgICAgICAgbmV3IEZvcm1BcnJheShbXSwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKVxuICAgICAgKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZU1hdHJpeCgpO1xuICAgIH0pO1xuICB9XG4gIGluaXRpYWxpemVNYXRyaXgoKSB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5xdWVzdGlvbi52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMucXVlc3Rpb24udmFsdWUubWFwKCh2KSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgdi5mb3JFYWNoKChxdWVzKSA9PiB7XG4gICAgICAgICAgaWYgKCFxdWVzLnZhbHVlKSByZXR1cm47XG4gICAgICAgICAgb2JqW3F1ZXMuX2lkXSA9IHF1ZXMudmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICAodGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0gYXMgRm9ybUFycmF5KS5wdXNoKFxuICAgICAgICAgIG5ldyBGb3JtQ29udHJvbChvYmopXG4gICAgICAgICk7XG4gICAgICAgIGlmIChfLmlzRW1wdHkob2JqKSkge1xuICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdmFsaWQpXG4gICAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXS5zZXRFcnJvcnMoe1xuICAgICAgICBlcnI6ICdNYXRyaXggcmVwb3NuZSBub3QgdmFsaWQnLFxuICAgICAgfSk7XG4gIH1cblxuICBhZGRJbnN0YW5jZXMoKTogdm9pZCB7XG4gICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IHRoaXMucXVlc3Rpb24udmFsdWUgPyB0aGlzLnF1ZXN0aW9uLnZhbHVlIDogW107XG4gICAgdGhpcy5xdWVzdGlvbi52YWx1ZS5wdXNoKFxuICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnF1ZXN0aW9uLmluc3RhbmNlUXVlc3Rpb25zKSlcbiAgICApO1xuICAgIHRoaXMubWF0cml4Rm9ybS5yZXNldCgpO1xuICAgIHRoaXMuZm9ybUFzQXJyYXkucHVzaChuZXcgRm9ybUNvbnRyb2woW10sIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSkpO1xuICB9XG5cbiAgdmlld0luc3RhbmNlKGkpOiB2b2lkIHtcbiAgICB0aGlzLm1hdHJpeEZvcm0ucmVzZXQoKTtcbiAgICBpZiAodGhpcy5mb3JtQXNBcnJheS5jb250cm9sc1tpXS52YWx1ZSkge1xuICAgICAgdGhpcy5tYXRyaXhGb3JtLnBhdGNoVmFsdWUodGhpcy5mb3JtQXNBcnJheS5jb250cm9sc1tpXS52YWx1ZSk7XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBUZW1wbGF0ZU1vZGFsQ29uZmlnPElDb250ZXh0LCBzdHJpbmcsIHN0cmluZz4oXG4gICAgICB0aGlzLm1vZGFsVGVtcGxhdGVcbiAgICApO1xuICAgIGNvbmZpZy5jbG9zZVJlc3VsdCA9ICdjbG9zZWQhJztcbiAgICBjb25maWcuY29udGV4dCA9IHtcbiAgICAgIHF1ZXN0aW9uczogdGhpcy5xdWVzdGlvbi52YWx1ZVtpXSxcbiAgICAgIGhlYWRpbmc6IGAke3RoaXMucXVlc3Rpb24uaW5zdGFuY2VJZGVudGlmaWVyfSAke2kgKyAxfWAsXG4gICAgICBpbmRleDogaSxcbiAgICB9O1xuICAgIHRoaXMuY29udGV4dCA9IGNvbmZpZy5jb250ZXh0O1xuICAgIHRoaXMuc2hvd0JhZGdlQXNzaW5nTW9kZWwgPSB0cnVlO1xuICB9XG5cbiAgZ2V0IGZvcm1Bc0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXSBhcyBGb3JtQXJyYXk7XG4gIH1cblxuICBtYXRyaXhTdWJtaXQoaW5kZXgpIHtcbiAgICB0aGlzLnNob3dCYWRnZUFzc2luZ01vZGVsID0gZmFsc2U7XG4gICAgdGhpcy5mb3JtQXNBcnJheS5hdChpbmRleCkucGF0Y2hWYWx1ZSh0aGlzLm1hdHJpeEZvcm0udmFsdWUpO1xuICAgIGlmICh0aGlzLm1hdHJpeEZvcm0uaW52YWxpZCkge1xuICAgICAgdGhpcy5mb3JtQXNBcnJheS5hdChpbmRleCkuc2V0RXJyb3JzKHsgZXJyOiAnTWF0cml4IHJlcG9zbmUgbm90IHZhbGlkJyB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkZWxldGVJbnN0YW5jZUFsZXJ0KGluZGV4KSB7XG4gICAgLy8gbGV0IG1ldGFEYXRhID0gYXdhaXQgdGhpcy5vYnNlcnZhdGlvblV0aWxTZXJ2aWNlLmdldEFsZXJ0TWV0YURhdGEoKTtcbiAgICAvLyBtZXRhRGF0YS5jb250ZW50LmJvZHkuZGF0YSA9XG4gICAgLy8gICB0aGlzLnJlc291cmNlU2VydmljZS5mcm1lbG1udHMubGJsLmRlbGV0ZVN1Ym1pc3Npb247XG4gICAgLy8gbWV0YURhdGEuY29udGVudC5ib2R5LnR5cGUgPSAndGV4dCc7XG4gICAgLy8gbWV0YURhdGEuY29udGVudC50aXRsZSA9IHRoaXMucmVzb3VyY2VTZXJ2aWNlLmZybWVsbW50cy5idG4uZGVsZXRlO1xuICAgIC8vIG1ldGFEYXRhLnNpemUgPSAnbWluaSc7XG4gICAgLy8gbWV0YURhdGEuZm9vdGVyLmJ1dHRvbnMucHVzaCh7XG4gICAgLy8gICB0eXBlOiAnY2FuY2VsJyxcbiAgICAvLyAgIHJldHVyblZhbHVlOiBmYWxzZSxcbiAgICAvLyAgIGJ1dHRvblRleHQ6IHRoaXMucmVzb3VyY2VTZXJ2aWNlLmZybWVsbW50cy5idG4ubm8sXG4gICAgLy8gfSk7XG4gICAgLy8gbWV0YURhdGEuZm9vdGVyLmJ1dHRvbnMucHVzaCh7XG4gICAgLy8gICB0eXBlOiAnYWNjZXB0JyxcbiAgICAvLyAgIHJldHVyblZhbHVlOiB0cnVlLFxuICAgIC8vICAgYnV0dG9uVGV4dDogdGhpcy5yZXNvdXJjZVNlcnZpY2UuZnJtZWxtbnRzLmJ0bi55ZXMsXG4gICAgLy8gfSk7XG4gICAgLy8gbWV0YURhdGEuZm9vdGVyLmNsYXNzTmFtZSA9ICdkb3VibGUtYnRuJztcbiAgICAvLyBjb25zdCBhY2NlcHRlZCA9IGF3YWl0IHRoaXMub2JzZXJ2YXRpb25VdGlsU2VydmljZS5zaG93UG9wdXBBbGVydChtZXRhRGF0YSk7XG4gICAgY29uc3QgYWxlcnRNZXRhOiBBbGVydE1ldGEgPSB7XG4gICAgICB0aXRsZTogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmFsZXJ0LnVwbG9hZFRlcm1zUmVqZWN0ZWQsXG4gICAgICBzaXplOiAnbWluaScsXG4gICAgICBib2R5VHlwZTogJ3RleHQnLFxuICAgICAgZGF0YTogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmxibC5kZWxldGVTdWJtaXNzaW9uLFxuICAgICAgYnV0dG9uQ2xhc3M6ICdkb3VibGUtYnRuJyxcbiAgICAgIGFjY2VwdFRleHQ6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4ueWVzLFxuICAgICAgY2FuY2VsVGV4dDogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi5ubyxcbiAgICB9O1xuICAgIGNvbnN0IGFjY2VwdGVkID0gdGhpcy51dGlscy5hbGVydChhbGVydE1ldGEpO1xuICAgIGlmICghYWNjZXB0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgKHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdIGFzIEZvcm1BcnJheSkucmVtb3ZlQXQoXG4gICAgICBpbmRleFxuICAgICk7XG4gIH1cbn1cbiJdfQ==