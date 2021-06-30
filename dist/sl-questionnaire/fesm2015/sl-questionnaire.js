import { __decorate, __awaiter } from 'tslib';
import { CommonModule } from '@angular/common';
import { ɵɵdefineInjectable, Injectable, Input, Component, EventEmitter, Output, ɵɵinject, ViewChild, NgModule } from '@angular/core';
import { FormControl, FormArray, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModalService, TemplateModalConfig, SuiModule } from 'ng2-semantic-ui-v9';
import { isEmpty } from 'lodash-es';

let SlTranslateService = class SlTranslateService {
};
SlTranslateService.ɵprov = ɵɵdefineInjectable({ factory: function SlTranslateService_Factory() { return new SlTranslateService(); }, token: SlTranslateService, providedIn: "root" });
SlTranslateService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], SlTranslateService);

var ResponseType;
(function (ResponseType) {
    ResponseType["TEXT"] = "text";
    ResponseType["NUMBER"] = "number";
    ResponseType["RADIO"] = "radio";
    ResponseType["MULTISELECT"] = "multiselect";
    ResponseType["DATE"] = "date";
    ResponseType["SLIDER"] = "slider";
    ResponseType["PAGEQUESTIONS"] = "pageQuestions";
    ResponseType["MATRIX"] = "matrix";
})(ResponseType || (ResponseType = {}));

let SlQuestionnaireService = class SlQuestionnaireService {
    constructor() {
        this.validate = (data) => {
            return (control) => {
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
    }
    testRegex(regexExpression, value) {
        const regex = new RegExp(regexExpression);
        return regex.test(value);
    }
    setSubmissionId(submissionId) {
        this._submissionId = submissionId;
    }
    getSubmissionId() {
        return this._submissionId;
    }
    mapSubmissionToAssessment(data) {
        const assessment = data.assessment;
        for (const evidence of assessment.evidences) {
            const validSubmission = assessment.submissions[evidence.externalId];
            if (validSubmission) {
                evidence.notApplicable = validSubmission.notApplicable;
                if (evidence.notApplicable) {
                    continue;
                }
                for (const section of evidence.sections) {
                    for (const question of section.questions) {
                        if (question.responseType === 'pageQuestions') {
                            for (const questions of question.pageQuestions) {
                                questions.value =
                                    questions.responseType !== 'matrix'
                                        ? validSubmission.answers[questions._id].value
                                        : this.constructMatrixValue(validSubmission, questions, evidence.externalId);
                                questions.remarks = validSubmission.answers[questions._id]
                                    ? validSubmission.answers[questions._id].remarks
                                    : '';
                                questions.fileName = validSubmission.answers[questions._id]
                                    ? validSubmission.answers[questions._id].fileName
                                    : [];
                            }
                        }
                        else if (validSubmission.answers &&
                            validSubmission.answers[question._id]) {
                            question.value =
                                question.responseType !== 'matrix'
                                    ? validSubmission.answers[question._id].value
                                    : this.constructMatrixValue(validSubmission, question, evidence.externalId);
                            question.remarks = validSubmission.answers[question._id]
                                ? validSubmission.answers[question._id].remarks
                                : '';
                            question.fileName = validSubmission.answers[question._id]
                                ? validSubmission.answers[question._id].fileName
                                : [];
                        }
                    }
                }
            }
        }
        this.setSubmissionId(assessment.submissionId);
        return data;
    }
    constructMatrixValue(validSubmission, matrixQuestion, ecmId) {
        matrixQuestion.value = [];
        if (validSubmission.answers &&
            validSubmission.answers[matrixQuestion._id] &&
            validSubmission.answers[matrixQuestion._id].value) {
            for (const answer of validSubmission.answers[matrixQuestion._id].value) {
                matrixQuestion.value.push(JSON.parse(JSON.stringify(matrixQuestion.instanceQuestions)));
            }
            matrixQuestion.value.forEach((instance, index) => {
                instance.forEach((question, instanceIndex) => {
                    if (validSubmission.answers[matrixQuestion._id] &&
                        validSubmission.answers[matrixQuestion._id].value[index][question._id]) {
                        question.value =
                            validSubmission.answers[matrixQuestion._id].value[index][question._id].value;
                        question.remarks =
                            validSubmission.answers[matrixQuestion._id].value[index][question._id].remarks;
                        question.fileName =
                            validSubmission.answers[matrixQuestion._id].value[index][question._id].fileName;
                    }
                });
            });
            return matrixQuestion.value;
        }
        else {
            return [];
        }
    }
    getEvidenceData(evidence, formValues) {
        let sections = evidence.sections;
        let answers = this.getSectionData(sections, formValues);
        let payloadData = {
            externalId: evidence.externalId,
            answers: answers,
            startTime: evidence.startTime,
            endTime: Date.now(),
        };
        return payloadData;
    }
    getSectionData(sections, formValues) {
        let answers = {};
        for (let index = 0; index < sections.length; index++) {
            answers = Object.assign(Object.assign({}, answers), this.createpayload(sections[index].questions, formValues));
        }
        return answers;
    }
    createpayload(questions, formValues) {
        let answers = {};
        for (let index = 0; index < questions.length; index++) {
            let currentQuestion = questions[index];
            if (currentQuestion.responseType == 'pageQuestions') {
                answers = Object.assign(Object.assign({}, answers), this.createpayload(currentQuestion.pageQuestions, formValues));
                continue;
            }
            if (currentQuestion.responseType == 'matrix') {
                for (let index = 0; index < currentQuestion.value.length; index++) {
                    formValues[currentQuestion._id][index] = this.createpayload(currentQuestion.value[index], formValues[currentQuestion._id][index]);
                }
            }
            let perQuestionData = this.formatToPayload(currentQuestion, formValues);
            answers[currentQuestion._id] = perQuestionData;
        }
        return answers;
    }
    formatToPayload(currentQuestion, formValues) {
        let value = currentQuestion.responseType != 'matrix'
            ? currentQuestion.value
            : formValues[currentQuestion._id];
        return {
            qid: currentQuestion._id,
            value: value,
            remarks: currentQuestion.remarks,
            fileName: currentQuestion.fileName,
            gpsLocation: '',
            payload: {
                question: currentQuestion.question,
                labels: formValues[currentQuestion._id],
                responseType: currentQuestion.responseType,
                filesNotUploaded: [],
            },
            startTime: currentQuestion.startTime,
            endTime: currentQuestion.endTime,
            criteriaId: currentQuestion.payload.criteriaId,
            responseType: currentQuestion.responseType,
            evidenceMethod: currentQuestion.evidenceMethod,
            rubricLevel: '',
        };
    }
};
SlQuestionnaireService.ɵprov = ɵɵdefineInjectable({ factory: function SlQuestionnaireService_Factory() { return new SlQuestionnaireService(); }, token: SlQuestionnaireService, providedIn: "root" });
SlQuestionnaireService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], SlQuestionnaireService);

let TextInputComponent = class TextInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    ngOnInit() {
        this.placeholder = this.translate['frmelmnts'].lbl.enterResponse;
        setTimeout(() => {
            this.questionnaireForm.addControl(this.question._id, new FormControl(this.question.value || null, [
                this.qService.validate(this.question),
            ]));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
        });
    }
    get isValid() {
        return this.questionnaireForm.controls[this.question._id].valid;
    }
    get isTouched() {
        return this.questionnaireForm.controls[this.question._id].touched;
    }
    onChange(e) {
        let value = e.target.value;
        this.question.value = value;
        this.question.endTime = Date.now();
    }
};
TextInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
__decorate([
    Input()
], TextInputComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], TextInputComponent.prototype, "question", void 0);
TextInputComponent = __decorate([
    Component({
        selector: 'sl-text-input',
        template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <input\n    type=\"text\"\n    [formControlName]=\"question?._id\"\n    [ngClass]=\"!isValid && isTouched ? 'is-invalid ' : 'is-valid'\"\n    class=\"sb-form-control\"\n    [placeholder]=\"placeholder\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
        styles: [""]
    })
], TextInputComponent);

let DateInputComponent = class DateInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    ngOnInit() {
        var _a;
        this.autoCaptureText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.autoCapture;
        setTimeout(() => {
            this.questionnaireForm.addControl(this.question._id, new FormControl(this.question.value ? new Date(this.question.value) : null, [this.qService.validate(this.question)]));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
        });
        this.min = this.question.validation.min
            ? new Date(this.question.validation.min)
            : null;
        this.max = this.question.validation.max
            ? new Date(this.question.validation.max)
            : null;
    }
    onChange(e) {
        let value = e;
        this.question.value = value;
        this.question.endTime = Date.now();
    }
    autoCapture() {
        this.questionnaireForm.controls[this.question._id].patchValue(new Date(Date.now()));
    }
};
DateInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
__decorate([
    Input()
], DateInputComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], DateInputComponent.prototype, "question", void 0);
__decorate([
    Input()
], DateInputComponent.prototype, "autoCaptureText", void 0);
DateInputComponent = __decorate([
    Component({
        selector: 'sl-date-input',
        template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n  class=\"d-flex flex-ai-center flex-jc-space-between\"\n>\n  <div class=\"ui left icon input\">\n    <i class=\"calendar icon\"></i>\n    <input\n      suiDatepicker\n      [pickerMode]=\"'date'\"\n      [pickerUseNativeOnMobile]=\"false\"\n      [formControlName]=\"question?._id\"\n      (pickerSelectedDateChange)=\"onChange($event)\"\n      class=\"question-date-input\"\n      [pickerMinDate]=\"min\"\n      [pickerMaxDate]=\"max\"\n    />\n  </div>\n  <div *ngIf=\"question?.autoCapture && !question?.value\">\n    <button class=\"sb-btn sb-btn-normal sb-btn-primary\" (click)=\"autoCapture()\">\n\t\t{{autoCaptureText}}\n    </button>\n  </div>\n</div>\n",
        styles: [""]
    })
], DateInputComponent);

let NumberInputComponent = class NumberInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    ngOnInit() {
        var _a, _b;
        this.placeholder = (_b = (_a = this.translate['frmelmnts']) === null || _a === void 0 ? void 0 : _a.lbl) === null || _b === void 0 ? void 0 : _b.enterResponse;
        setTimeout(() => {
            this.questionnaireForm.addControl(this.question._id, new FormControl(this.question.value || null, [
                this.qService.validate(this.question),
            ]));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
        });
    }
    onChange(e) {
        let value = e.target.value;
        this.question.value = value;
        this.question.endTime = Date.now();
    }
    get isValid() {
        return this.questionnaireForm.controls[this.question._id].valid;
    }
    get isTouched() {
        return this.questionnaireForm.controls[this.question._id].touched;
    }
};
NumberInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
__decorate([
    Input()
], NumberInputComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], NumberInputComponent.prototype, "question", void 0);
NumberInputComponent = __decorate([
    Component({
        selector: 'sl-number-input',
        template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <input\n    type=\"number\"\n    [formControlName]=\"question?._id\"\n    class=\"sb-form-control\"\n    [placeholder]=\"placeholder\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
        styles: [""]
    })
], NumberInputComponent);

let RangeInputComponent = class RangeInputComponent {
    constructor(qService) {
        this.qService = qService;
    }
    ngOnInit() {
        setTimeout(() => {
            this.questionnaireForm.addControl(this.question._id, new FormControl(this.question.value || null, [
                this.qService.validate(this.question),
            ]));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
        });
    }
    onChange(e) {
        let value = e.target.value;
        this.question.value = value;
        this.question.endTime = Date.now();
    }
    get isValid() {
        return this.questionnaireForm.controls[this.question._id].valid;
    }
    get isTouched() {
        return this.questionnaireForm.controls[this.question._id].touched;
    }
    get min() {
        if (typeof this.question.validation == 'string') {
            return null;
        }
        return this.question.validation.min;
    }
    get max() {
        if (typeof this.question.validation == 'string') {
            return null;
        }
        return this.question.validation.max;
    }
};
RangeInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService }
];
__decorate([
    Input()
], RangeInputComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], RangeInputComponent.prototype, "question", void 0);
RangeInputComponent = __decorate([
    Component({
        selector: 'sl-range-input',
        template: "<div\n  class=\"\n    d-flex\n    flex-ai-center flex-dc\n    mt-30\n    ng-dirty ng-invalid ng-touched\n    range-wrap\n  \"\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <div class=\"range-value\" id=\"rangeV\">{{ this.question.value }}</div>\n\n  <input\n    id=\"range\"\n    type=\"range\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [ngClass]=\"isValid && isTouched ? 'is-invalid' : 'is-valid'\"\n    step=\"1\"\n    [formControlName]=\"question?._id\"\n    class=\"w-100\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
        styles: [".range-value{width:50px;height:50px;line-height:50px;border-radius:50%;font-size:20px;color:#0274fd;text-align:center;background:#e9e8d9;margin-bottom:17px}input[type=range]{height:34px;-webkit-appearance:none;margin:10px 0;width:100%}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:11px;cursor:pointer;animate:.2s;box-shadow:1px 1px 1px #000;background:#74a9d8;border-radius:1px;border:0 solid #010101}input[type=range]::-webkit-slider-thumb{box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer;-webkit-appearance:none;margin-top:-8px}input[type=range]:focus::-webkit-slider-runnable-track{background:#74a9d8}input[type=range]::-moz-range-track{width:100%;height:11px;cursor:pointer;animate:.2s;box-shadow:1px 1px 1px #000;background:#74a9d8;border-radius:1px;border:0 solid #010101}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer}input[type=range]::-ms-track{width:100%;height:11px;cursor:pointer;animate:.2s;background:0 0;border-color:transparent;color:transparent}input[type=range]::-ms-fill-lower{background:#74a9d8;border:0 solid #010101;border-radius:2px;box-shadow:1px 1px 1px #000}input[type=range]::-ms-fill-upper{background:#74a9d8;border:0 solid #010101;border-radius:2px;box-shadow:1px 1px 1px #000}input[type=range]::-ms-thumb{margin-top:1px;box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer}input[type=range]:focus::-ms-fill-lower{background:#74a9d8}input[type=range]:focus::-ms-fill-upper{background:#74a9d8}"]
    })
], RangeInputComponent);

let RadioInputComponent = class RadioInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
        this.dependentParent = new EventEmitter();
    }
    ngOnInit() {
        var _a;
        this.hintCloseText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.close;
        setTimeout(() => {
            this.questionnaireForm.addControl(this.question._id, new FormControl(this.question.value || null, this.qService.validate(this.question)));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
            if (this.question.value) {
                if (this.question.children.length) {
                    this.dependentParent.emit(this.question);
                }
            }
        });
    }
    get isValid() {
        return this.questionnaireForm.controls[this.question._id].valid;
    }
    get isTouched() {
        return this.questionnaireForm.controls[this.question._id].touched;
    }
    onChange(value) {
        this.questionnaireForm.controls[this.question._id].setValue(value);
        this.question.value = value;
        this.question.endTime = Date.now();
        if (this.question.children.length) {
            this.dependentParent.emit(this.question);
        }
    }
};
RadioInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
__decorate([
    Input()
], RadioInputComponent.prototype, "options", void 0);
__decorate([
    Input()
], RadioInputComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], RadioInputComponent.prototype, "question", void 0);
__decorate([
    Output()
], RadioInputComponent.prototype, "dependentParent", void 0);
RadioInputComponent = __decorate([
    Component({
        selector: 'sl-radio-input',
        template: "<div *ngIf=\"questionnaireForm?.contains(question._id)\">\n  <div\n    *ngFor=\"let o of options; let optionIndex = index\"\n    [formGroup]=\"questionnaireForm\"\n    class=\"\n      mb-15\n      sb-radio-btn-checkbox sb-radio-btn-primary\n      d-flex\n      flex-ai-baseline\n    \"\n  >\n    <input\n      type=\"radio\"\n      (change)=\"onChange(o.value)\"\n      [name]=\"question._id\"\n      [ngClass]=\"isValid && isTouched ? 'is-invalid' : 'is-valid'\"\n      [value]=\"o.value\"\n      [formControlName]=\"question._id\"\n    />\n    <label>{{ o.label }}</label>\n    <div *ngIf=\"question?.option && question?.option[optionIndex]?.hint\">\n      <i\n        class=\"icon large lightbulb\"\n        (click)=\"\n          isDimmed = !isDimmed; hint = question?.option[optionIndex]?.hint\n        \"\n      ></i>\n    </div>\n  </div>\n</div>\n\n<sui-dimmer [(isDimmed)]=\"isDimmed\" [isClickable]=\"true\">\n  <h4 class=\"ui inverted header\">{{ hint }}</h4>\n  <button\n    type=\"button\"\n    class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n    type=\"submit\"\n  >\n    {{ hintCloseText}}\n  </button>\n</sui-dimmer>\n",
        styles: [""]
    })
], RadioInputComponent);

let CheckboxInputComponent = class CheckboxInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
        this.dependentParent = new EventEmitter();
    }
    ngOnInit() {
        var _a;
        this.hintCloseText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.close;
        setTimeout(() => {
            const optionControl = this.options.map((v) => {
                if (this.question.value &&
                    this.question.value.find((_v) => _v == v.value)) {
                    return new FormControl(v.value);
                }
                return new FormControl('');
            });
            this.questionnaireForm.addControl(this.question._id, new FormArray(optionControl, this.qService.validate(this.question)));
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
    onChange(oId, isChecked, oIndex) {
        const formArray = this.questionnaireForm.get(this.question._id);
        if (isChecked) {
            formArray.controls[oIndex].patchValue(oId);
        }
        this.question.value =
            this.questionnaireForm.controls[this.question._id].value;
        this.question.value = this.question.value.filter(Boolean);
        this.question.endTime = Date.now();
        if (this.question.children.length) {
            this.dependentParent.emit(this.question);
        }
    }
    get isValid() {
        return this.questionnaireForm.controls[this.question._id].valid;
    }
    get isTouched() {
        return this.questionnaireForm.controls[this.question._id].touched;
    }
};
CheckboxInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
__decorate([
    Input()
], CheckboxInputComponent.prototype, "options", void 0);
__decorate([
    Input()
], CheckboxInputComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], CheckboxInputComponent.prototype, "question", void 0);
__decorate([
    Output()
], CheckboxInputComponent.prototype, "dependentParent", void 0);
CheckboxInputComponent = __decorate([
    Component({
        selector: 'sl-checkbox-input',
        template: "<div *ngIf=\"questionnaireForm?.contains(question._id)\">\n  <div\n    *ngFor=\"let o of options; let i = index\"\n    [formGroup]=\"questionnaireForm\"\n    class=\"mb-15 sb-checkbox sb-checkbox-secondary d-flex flex-ai-baseline\"\n  >\n    <div [formArrayName]=\"question._id\">\n      <sui-checkbox\n        (checkChange)=\"onChange(o.value, $event, i)\"\n        [formControlName]=\"i\"\n      >\n        {{ o.label }}\n      </sui-checkbox>\n    </div>\n    <div *ngIf=\"question?.option && question?.option[i]?.hint\">\n      <i\n        class=\"icon large lightbulb\"\n        (click)=\"isDimmed = !isDimmed; hint = question?.option[i]?.hint\"\n      ></i>\n    </div>\n  </div>\n</div>\n\n<sui-dimmer [(isDimmed)]=\"isDimmed\" [isClickable]=\"true\">\n  <h4 class=\"ui inverted header\">{{ hint }}</h4>\n  <button\n    type=\"button\"\n    class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n    type=\"submit\"\n  >\n    {{ hintCloseText }}\n  </button>\n</sui-dimmer>\n",
        styles: [""]
    })
], CheckboxInputComponent);

let QuesRemarksComponent = class QuesRemarksComponent {
    constructor(translate) {
        this.translate = translate;
        this.remark = '';
        this.saveClicked = new EventEmitter();
    }
    ngOnInit() {
        var _a;
        this.title = (_a = this.translate['frmelmnts'].lbl) === null || _a === void 0 ? void 0 : _a.remark_title;
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
};
QuesRemarksComponent.ctorParameters = () => [
    { type: SlTranslateService }
];
__decorate([
    Output()
], QuesRemarksComponent.prototype, "saveClicked", void 0);
__decorate([
    Input()
], QuesRemarksComponent.prototype, "question", void 0);
QuesRemarksComponent = __decorate([
    Component({
        selector: 'sl-ques-remarks',
        template: "<div class=\"d-flex flex-ai-center flex-jc-space-between my-10\">\n  <h5 class=\"my-10\">{{ title }}</h5>\n  <button\n    class=\"sb-btn sb-btn-normal sb-btn-primary\"\n    *ngIf=\"!remark.length\"\n    (click)=\"showRemarks = true\"\n  >\n    {{ remarksAddText }}\n  </button>\n  <span *ngIf=\"remark.length\" (click)=\"deleteRemark()\"\n    ><i class=\"trash large icon\"></i\n  ></span>\n</div>\n\n<div class=\"d-flex flex-ai-end\" *ngIf=\"showRemarks\">\n  <textarea\n    rows=\"3\"\n    class=\"w-100\"\n    [(ngModel)]=\"remark\"\n    (ngModelChange)=\"saveRemark()\"\n  >\n  </textarea>\n</div>\n",
        styles: [""]
    })
], QuesRemarksComponent);

let SlUtilsService = class SlUtilsService {
    constructor(modalService) {
        this.modalService = modalService;
    }
    /**
     * @param {AlertMeta}  meta: Alert Meta Form Object
     * @param {String} meta.title Optional ! Display title of alert fields
     * @param {String}  meta.size Provide size of alert.('tiny','mini)
     * @param {AlertBodyType}  meta.bodyType Alert-content type to show in alert body
     * @param {String}  meta.data content to show
     * @param {String}  meta.buttonClass class to apply on button div
     * @param {String}  meta.acceptText text to show in accept button
     * @param {String}  meta.cancelText text to show in accept button
     * @param {String}  meta.type Optional ! To set type of alert
     * @param {Boolean}  meta.closeIcon Optional ! Show top right close icon , default = false
     */
    alert(meta) {
        const button = [];
        meta.acceptText &&
            button.push({
                type: 'accept',
                returnValue: true,
                buttonText: meta.acceptText,
            });
        meta.cancelText &&
            button.push({
                type: 'cancel',
                returnValue: false,
                buttonText: meta.cancelText,
            });
        let alertMeta = {
            type: meta.type,
            size: meta.size,
            isClosed: meta.closeIcon,
            content: {
                title: meta.title,
                body: {
                    type: meta.bodyType,
                    data: meta.data,
                },
            },
            footer: {
                className: meta.buttonClass,
                buttons: button,
            },
        };
        return this.openAlert(alertMeta);
    }
};
SlUtilsService.ctorParameters = () => [
    { type: SuiModalService }
];
SlUtilsService.ɵprov = ɵɵdefineInjectable({ factory: function SlUtilsService_Factory() { return new SlUtilsService(ɵɵinject(SuiModalService)); }, token: SlUtilsService, providedIn: "root" });
SlUtilsService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], SlUtilsService);

let AttachmentComponent = class AttachmentComponent {
    constructor(translate, utils) {
        this.translate = translate;
        this.utils = utils;
    }
    ngOnInit() { }
    basicUpload(files) {
        let sizeMB = +(files[0].size / 1000 / 1000).toFixed(4);
        if (sizeMB > 20) {
            this.fileLimitCross();
            return;
        }
        this.formData = new FormData();
        Array.from(files).forEach((f) => this.formData.append('file', f));
        this.preSignedUrl(this.getFileNames(this.formData));
    }
    fileLimitCross() {
        const alertMeta = {
            size: 'tiny',
            bodyType: 'text',
            data: this.translate['frmelmnts'].alert.fileLimitCross20,
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
        this.utils.getPreSingedUrls(payload).subscribe((imageData) => {
            const presignedUrlData = imageData['result'][this.data.submissionId].files[0];
            this.formData.append('url', presignedUrlData.url);
            this.utils.cloudStorageUpload(this.formData).subscribe((success) => {
                if (success.status === 200) {
                    const obj = {
                        name: this.getFileNames(this.formData)[0],
                        url: presignedUrlData.url.split('?')[0],
                    };
                    for (const key of Object.keys(presignedUrlData.payload)) {
                        obj[key] = presignedUrlData['payload'][key];
                    }
                    this.data.files.push(obj);
                    const alertMeta = {
                        size: 'tiny',
                        bodyType: 'text',
                        data: this.translate['frmelmnts'].alert.evidenceUploaded,
                        buttonClass: 'single-btn',
                        acceptText: this.translate['frmelmnts'].btn.ok,
                        cancelText: null,
                        type: 'uploaded',
                    };
                    this.utils.alert(alertMeta);
                }
                else {
                    this.utils.error(this.translate['frmelmnts'].message.unableToUpload);
                }
            }, (error) => {
                this.utils.error(this.translate['frmelmnts'].message.unableToUpload);
            });
        }, (error) => {
            console.log(error);
        });
    }
    extension(name) {
        return name.split('.').pop();
    }
    openFile(file) {
        window.open(file.url, '_blank');
    }
    deleteAttachment(fileIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const alertMeta = {
                size: 'mini',
                bodyType: 'text',
                data: this.translate['frmelmnts'].alert.confirmEvidenceDelete,
                buttonClass: 'double-btn',
                acceptText: this.translate['frmelmnts'].btn.ok,
                cancelText: this.translate['frmelmnts'].btn.no,
            };
            const accepted = yield this.utils.alert(alertMeta);
            if (!accepted) {
                return;
            }
            this.data.files.splice(fileIndex, 1);
        });
    }
    onAddApproval(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = `
    ${this.translate['frmelmnts'].alert.evidence_content_policy}<a href='/term-of-use.html' target="_blank">${this.translate['frmelmnts'].alert.evidence_content_policy_label}</a> .${this.translate['frmelmnts'].alert.uploadevidencecontent}
    `;
            const alertMeta = {
                size: 'tiny',
                bodyType: 'checkbox',
                data: html,
                buttonClass: 'double-btn',
                acceptText: this.translate['frmelmnts'].btn.upload,
                cancelText: this.translate['frmelmnts'].btn.donotupload,
            };
            let returnData = yield this.utils.alert(alertMeta);
            if (!returnData) {
                this.notAccepted();
                return;
            }
            file.click();
        });
    }
    notAccepted() {
        const alertMeta = {
            size: 'tiny',
            bodyType: 'text',
            data: this.translate['frmelmnts'].alert.uploadTermsRejected,
            buttonClass: 'single-btn',
            acceptText: this.translate['frmelmnts'].btn.ok,
            cancelText: null,
            type: 'notAccepted',
        };
        this.utils.alert(alertMeta);
    }
};
AttachmentComponent.ctorParameters = () => [
    { type: SlTranslateService },
    { type: SlUtilsService }
];
__decorate([
    Input()
], AttachmentComponent.prototype, "data", void 0);
AttachmentComponent = __decorate([
    Component({
        selector: 'sl-attachment',
        template: "<label for=\"file-upload\" class=\"custom-file-upload\"></label>\n<input\n  id=\"file-upload\"\n  type=\"file\"\n  #file\n  (change)=\"basicUpload($event.target.files)\"\n/>\n<div class=\"d-flex\">\n  <div class=\"bs-1 p-20\" (click)=\"onAddApproval(file)\">\n    <i class=\"plus icon\"></i>\n  </div>\n  <div\n    *ngFor=\"let item of data.files; let i = index\"\n    (click)=\"openFile(item)\"\n    class=\"area\"\n  >\n    <a\n      class=\"remove-image\"\n      (click)=\"$event.stopPropagation(); deleteAttachment(i)\"\n      >&#215;</a\n    >\n    <div *ngIf=\"extension(item.name) == 'png'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'jpg'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'jpeg'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'pdf'\" class=\"mx-10\">\n      <i class=\"file pdf outline icon\"></i>\n    </div>\n  </div>\n</div>\n",
        styles: ["input[type=file]{display:none}.area{position:relative}.area a{display:inline}.area i{font-size:40px}.remove-image{display:none;position:absolute;top:-10px;right:2px;border-radius:10em;padding:2px 6px 3px;text-decoration:none;background:#555;border:3px solid #fff;color:#fff!important;box-shadow:0 2px 6px rgba(0,0,0,.5),inset 0 2px 4px rgba(0,0,0,.3);text-shadow:0 1px 2px rgba(0,0,0,.5);transition:background .5s}.remove-image:hover{background:#e54e4e;padding:3px 7px 5px;top:-11px;right:2px}.remove-image:active{background:#e54e4e;top:-10px;right:2px}.bs-1{background-color:grey}"]
    })
], AttachmentComponent);

let InputComponent = class InputComponent {
    constructor(translate, qService) {
        this.translate = translate;
        this.qService = qService;
        this.dimmerCloseText = this.translate['frmelmnts'].btn.close;
    }
    get reponseType() {
        return ResponseType;
    }
    toggleQuestion(parent) {
        const { children } = parent;
        this.questions.map((q, i) => {
            if (children.includes(q._id)) {
                let child = this.questions[i];
                child['canDisplay'] = this.canDisplayChildQ(child, i);
                if (child['canDisplay'] == false) {
                    child.value = '';
                    this.questionnaireForm.removeControl(child._id);
                }
            }
        });
    }
    canDisplayChildQ(currentQuestion, currentQuestionIndex) {
        let display = true;
        if (typeof currentQuestion.visibleIf == 'string' || null || undefined) {
            return false; //if condition not present
        }
        for (const question of this.questions) {
            for (const condition of currentQuestion.visibleIf) {
                if (condition._id === question._id) {
                    let expression = [];
                    if (condition.operator != '===') {
                        if (question.responseType === 'multiselect') {
                            for (const parentValue of question.value) {
                                for (const value of condition.value) {
                                    expression.push('(', "'" + parentValue + "'", '===', "'" + value + "'", ')', condition.operator);
                                }
                            }
                        }
                        else {
                            for (const value of condition.value) {
                                expression.push('(', "'" + question.value + "'", '===', "'" + value + "'", ')', condition.operator);
                            }
                        }
                        expression.pop();
                    }
                    else {
                        if (question.responseType === 'multiselect') {
                            for (const value of question.value) {
                                expression.push('(', "'" + condition.value + "'", '===', "'" + value + "'", ')', '||');
                            }
                            expression.pop();
                        }
                        else {
                            expression.push('(', "'" + question.value + "'", condition.operator, "'" + condition.value + "'", ')');
                        }
                    }
                    if (!eval(expression.join(''))) {
                        this.questions[currentQuestionIndex].isCompleted = true;
                        return false;
                    }
                    else {
                        // this.questions[currentQuestionIndex].isCompleted =
                        //   this.utils.isQuestionComplete(currentQuestion);
                    }
                }
            }
        }
        return display;
    }
};
InputComponent.ctorParameters = () => [
    { type: SlTranslateService },
    { type: SlQuestionnaireService }
];
__decorate([
    Input()
], InputComponent.prototype, "questions", void 0);
__decorate([
    Input()
], InputComponent.prototype, "questionnaireForm", void 0);
InputComponent = __decorate([
    Component({
        selector: 'sl-input',
        template: "<div *ngFor=\"let question of questions; let qi = index\">\n  <div\n    [ngClass]=\"{\n      'ui card question-card sb--card relative9':\n        question.responseType != 'pageQuestions'\n    }\"\n    *ngIf=\"!question.visibleIf.length || question.canDisplay == true\"\n  >\n    <div [ngClass]=\"{ content: question.responseType != 'pageQuestions' }\">\n      <div class=\"d-flex flex-ai-flex-start flex-jc-space-between\">\n        <div\n          *ngFor=\"let q of question.question; let qai = index\"\n          [ngClass]=\"{\n            'mb-20': q.length,\n            'valid-response': questionnaireForm?.controls[question._id]?.valid\n          }\"\n        >\n          <div class=\"sb-h5\">\n            {{ qai == 0 ? qi + 1 + \")\" : \"\" }}&nbsp;{{ q }}\n          </div>\n        </div>\n        <div *ngIf=\"question?.hint\">\n          <i\n            class=\"icon large lightbulb\"\n            (click)=\"dimmerIndex = qi; isDimmed = !isDimmed\"\n          ></i>\n        </div>\n      </div>\n      <div *ngIf=\"question?.tip\" class=\"mb-10\">\n        <small class=\"mb-10\">{{ question?.tip }}</small>\n      </div>\n      <div class=\"sbt-page-content-questionnaireFormarea'\">\n        <sl-text-input\n          *ngIf=\"question.responseType == reponseType.TEXT\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-text-input>\n        <sl-date-input\n          *ngIf=\"question.responseType == reponseType.DATE\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-date-input>\n        <sl-number-input\n          *ngIf=\"question.responseType == reponseType.NUMBER\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-number-input>\n        <sl-range-input\n          *ngIf=\"question.responseType == reponseType.SLIDER\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-range-input>\n        <sl-radio-input\n          *ngIf=\"question.responseType == reponseType.RADIO\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n          [options]=\"question.options\"\n          (dependentParent)=\"toggleQuestion($event)\"\n        ></sl-radio-input>\n        <sl-checkbox-input\n          *ngIf=\"question.responseType == reponseType.MULTISELECT\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n          [options]=\"question.options\"\n          (dependentParent)=\"toggleQuestion($event)\"\n        ></sl-checkbox-input>\n        <sl-page-questions\n          *ngIf=\"\n            question.responseType == reponseType.PAGEQUESTIONS;\n            pageQuestions\n          \"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-page-questions>\n        <sl-matrix-questions\n          *ngIf=\"question.responseType == reponseType.MATRIX\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-matrix-questions>\n        <sl-ques-remarks\n          [question]=\"question\"\n          *ngIf=\"question.showRemarks\"\n        ></sl-ques-remarks>\n        <sl-attachment\n          [data]=\"{\n            submissionId: qService.getSubmissionId(),\n            files: question.fileName\n          }\"\n          *ngIf=\"question.file\"\n        ></sl-attachment>\n        <sui-dimmer\n          [(isDimmed)]=\"isDimmed\"\n          [isClickable]=\"true\"\n          *ngIf=\"dimmerIndex == qi && question?.hint\"\n        >\n          <div class=\"center\">\n            <h4 class=\"ui inverted header\">{{ question?.hint }}</h4>\n            <button\n              type=\"button\"\n              class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n              type=\"submit\"\n            >\n              {{ dimmerCloseText }}\n            </button>\n          </div>\n        </sui-dimmer>\n      </div>\n    </div>\n  </div>\n</div>\n",
        styles: [".question-card{border-radius:28px;padding:20px;width:100%;margin-bottom:20px}.question-card:last-child{margin-bottom:20px}:host .question-card.sb--card,:host .sb-radio-btn-checkbox{width:100%;background-color:var(--sb-card-bg);color:var(--primary-color)}:host label{color:var(--body-color)}:host ::ng-deep .question-card .sb-checkbox label,:host ::ng-deep .question-card .sb-radio-btn-checkbox label{color:var(--body-color);font-weight:400}:host ::ng-deep .question-card input:focus,:host ::ng-deep .question-card input:focus~label{color:var(--body-color)}:host ::ng-deep .question-card #range{background-color:var(--sb-card-bg)}:host ::ng-deep .question-card .student-card{background-color:var(--sb-card-bg)}:host ::ng-deep .question-card .question-date-input,:host ::ng-deep .question-card input:active.question-date-input,:host ::ng-deep .question-card input:focus.question-date-input{background:var(--cc-sbcard-data1-bg);color:var(--sb-prominent-filter-title)}.remarks{margin-top:15px}.valid-response{color:var(--green)}"]
    })
], InputComponent);

let PageQuestionsComponent = class PageQuestionsComponent {
    constructor() { }
    ngOnInit() { }
};
__decorate([
    Input()
], PageQuestionsComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], PageQuestionsComponent.prototype, "question", void 0);
PageQuestionsComponent = __decorate([
    Component({
        selector: 'sl-page-questions',
        template: "<sl-input\n  [questions]=\"question.pageQuestions\"\n  [questionnaireForm]=\"questionnaireForm\"\n></sl-input>\n",
        styles: [""]
    })
], PageQuestionsComponent);

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
                if (isEmpty(obj)) {
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

let SlQuestionnaireModule = class SlQuestionnaireModule {
};
SlQuestionnaireModule = __decorate([
    NgModule({
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
], SlQuestionnaireModule);

/*
 * Public API Surface of sl-questionnaire
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AttachmentComponent, CheckboxInputComponent, DateInputComponent, InputComponent, MatrixQuestionsComponent, NumberInputComponent, PageQuestionsComponent, QuesRemarksComponent, RadioInputComponent, RangeInputComponent, ResponseType, SlQuestionnaireModule, SlQuestionnaireService, SlTranslateService, SlUtilsService, TextInputComponent };
//# sourceMappingURL=sl-questionnaire.js.map
