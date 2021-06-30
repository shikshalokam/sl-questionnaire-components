(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('ng2-semantic-ui-v9'), require('lodash-es')) :
    typeof define === 'function' && define.amd ? define('sl-questionnaire', ['exports', '@angular/common', '@angular/core', '@angular/forms', 'ng2-semantic-ui-v9', 'lodash-es'], factory) :
    (global = global || self, factory(global['sl-questionnaire'] = {}, global.ng.common, global.ng.core, global.ng.forms, global.ng2SemanticUiV9, global.lodashEs));
}(this, (function (exports, common, core, forms, ng2SemanticUiV9, lodashEs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var SlTranslateService = /** @class */ (function () {
        function SlTranslateService() {
        }
        SlTranslateService.ɵprov = core.ɵɵdefineInjectable({ factory: function SlTranslateService_Factory() { return new SlTranslateService(); }, token: SlTranslateService, providedIn: "root" });
        SlTranslateService = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], SlTranslateService);
        return SlTranslateService;
    }());


    (function (ResponseType) {
        ResponseType["TEXT"] = "text";
        ResponseType["NUMBER"] = "number";
        ResponseType["RADIO"] = "radio";
        ResponseType["MULTISELECT"] = "multiselect";
        ResponseType["DATE"] = "date";
        ResponseType["SLIDER"] = "slider";
        ResponseType["PAGEQUESTIONS"] = "pageQuestions";
        ResponseType["MATRIX"] = "matrix";
    })(exports.ResponseType || (exports.ResponseType = {}));

    var SlQuestionnaireService = /** @class */ (function () {
        function SlQuestionnaireService() {
            var _this = this;
            this.validate = function (data) {
                return function (control) {
                    if (typeof data.validation == 'string') {
                        return null;
                    }
                    if (!data.validation.required) {
                        return null;
                    }
                    if (data.validation.regex) {
                        var forbidden = _this.testRegex(data.validation.regex, control.value);
                        return forbidden ? null : { err: 'Invalid character found' };
                    }
                    if (data.validation.IsNumber) {
                        if (!control.value) {
                            return { err: 'Number not entered' };
                        }
                        var forbidden = !isNaN(control.value);
                        return forbidden ? null : { err: 'Only numbers allowed' };
                    }
                    if (data.validation.required) {
                        if (!control.value) {
                            return { err: 'Required field' };
                        }
                        if (data.responseType == exports.ResponseType.MULTISELECT) {
                            return control.value.some(function (v) { return v != ''; })
                                ? null
                                : { err: 'Select at least one option' };
                        }
                        if (data.responseType == exports.ResponseType.SLIDER) {
                            var min = data.validation.min;
                            var max = data.validation.max;
                            return min <= control.value && control.value <= max
                                ? null
                                : { err: 'Selected value  not within range' };
                        }
                    }
                };
            };
        }
        SlQuestionnaireService.prototype.testRegex = function (regexExpression, value) {
            var regex = new RegExp(regexExpression);
            return regex.test(value);
        };
        SlQuestionnaireService.prototype.setSubmissionId = function (submissionId) {
            this._submissionId = submissionId;
        };
        SlQuestionnaireService.prototype.getSubmissionId = function () {
            return this._submissionId;
        };
        SlQuestionnaireService.prototype.mapSubmissionToAssessment = function (data) {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
            var assessment = data.assessment;
            try {
                for (var _e = __values(assessment.evidences), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var evidence = _f.value;
                    var validSubmission = assessment.submissions[evidence.externalId];
                    if (validSubmission) {
                        evidence.notApplicable = validSubmission.notApplicable;
                        if (evidence.notApplicable) {
                            continue;
                        }
                        try {
                            for (var _g = (e_2 = void 0, __values(evidence.sections)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var section = _h.value;
                                try {
                                    for (var _j = (e_3 = void 0, __values(section.questions)), _k = _j.next(); !_k.done; _k = _j.next()) {
                                        var question = _k.value;
                                        if (question.responseType === 'pageQuestions') {
                                            try {
                                                for (var _l = (e_4 = void 0, __values(question.pageQuestions)), _m = _l.next(); !_m.done; _m = _l.next()) {
                                                    var questions = _m.value;
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
                                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                            finally {
                                                try {
                                                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                                                }
                                                finally { if (e_4) throw e_4.error; }
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
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.setSubmissionId(assessment.submissionId);
            return data;
        };
        SlQuestionnaireService.prototype.constructMatrixValue = function (validSubmission, matrixQuestion, ecmId) {
            var e_5, _a;
            matrixQuestion.value = [];
            if (validSubmission.answers &&
                validSubmission.answers[matrixQuestion._id] &&
                validSubmission.answers[matrixQuestion._id].value) {
                try {
                    for (var _b = __values(validSubmission.answers[matrixQuestion._id].value), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var answer = _c.value;
                        matrixQuestion.value.push(JSON.parse(JSON.stringify(matrixQuestion.instanceQuestions)));
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                matrixQuestion.value.forEach(function (instance, index) {
                    instance.forEach(function (question, instanceIndex) {
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
        };
        SlQuestionnaireService.prototype.getEvidenceData = function (evidence, formValues) {
            var sections = evidence.sections;
            var answers = this.getSectionData(sections, formValues);
            var payloadData = {
                externalId: evidence.externalId,
                answers: answers,
                startTime: evidence.startTime,
                endTime: Date.now(),
            };
            return payloadData;
        };
        SlQuestionnaireService.prototype.getSectionData = function (sections, formValues) {
            var answers = {};
            for (var index = 0; index < sections.length; index++) {
                answers = __assign(__assign({}, answers), this.createpayload(sections[index].questions, formValues));
            }
            return answers;
        };
        SlQuestionnaireService.prototype.createpayload = function (questions, formValues) {
            var answers = {};
            for (var index = 0; index < questions.length; index++) {
                var currentQuestion = questions[index];
                if (currentQuestion.responseType == 'pageQuestions') {
                    answers = __assign(__assign({}, answers), this.createpayload(currentQuestion.pageQuestions, formValues));
                    continue;
                }
                if (currentQuestion.responseType == 'matrix') {
                    for (var index_1 = 0; index_1 < currentQuestion.value.length; index_1++) {
                        formValues[currentQuestion._id][index_1] = this.createpayload(currentQuestion.value[index_1], formValues[currentQuestion._id][index_1]);
                    }
                }
                var perQuestionData = this.formatToPayload(currentQuestion, formValues);
                answers[currentQuestion._id] = perQuestionData;
            }
            return answers;
        };
        SlQuestionnaireService.prototype.formatToPayload = function (currentQuestion, formValues) {
            var value = currentQuestion.responseType != 'matrix'
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
        };
        SlQuestionnaireService.ɵprov = core.ɵɵdefineInjectable({ factory: function SlQuestionnaireService_Factory() { return new SlQuestionnaireService(); }, token: SlQuestionnaireService, providedIn: "root" });
        SlQuestionnaireService = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], SlQuestionnaireService);
        return SlQuestionnaireService;
    }());

    var TextInputComponent = /** @class */ (function () {
        function TextInputComponent(qService, translate) {
            this.qService = qService;
            this.translate = translate;
        }
        TextInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.placeholder = this.translate['frmelmnts'].lbl.enterResponse;
            setTimeout(function () {
                _this.questionnaireForm.addControl(_this.question._id, new forms.FormControl(_this.question.value || null, [
                    _this.qService.validate(_this.question),
                ]));
                _this.question.startTime = _this.question.startTime
                    ? _this.question.startTime
                    : Date.now();
            });
        };
        Object.defineProperty(TextInputComponent.prototype, "isValid", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputComponent.prototype, "isTouched", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].touched;
            },
            enumerable: true,
            configurable: true
        });
        TextInputComponent.prototype.onChange = function (e) {
            var value = e.target.value;
            this.question.value = value;
            this.question.endTime = Date.now();
        };
        TextInputComponent.ctorParameters = function () { return [
            { type: SlQuestionnaireService },
            { type: SlTranslateService }
        ]; };
        __decorate([
            core.Input()
        ], TextInputComponent.prototype, "questionnaireForm", void 0);
        __decorate([
            core.Input()
        ], TextInputComponent.prototype, "question", void 0);
        TextInputComponent = __decorate([
            core.Component({
                selector: 'sl-text-input',
                template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <input\n    type=\"text\"\n    [formControlName]=\"question?._id\"\n    [ngClass]=\"!isValid && isTouched ? 'is-invalid ' : 'is-valid'\"\n    class=\"sb-form-control\"\n    [placeholder]=\"placeholder\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
                styles: [""]
            })
        ], TextInputComponent);
        return TextInputComponent;
    }());

    var DateInputComponent = /** @class */ (function () {
        function DateInputComponent(qService, translate) {
            this.qService = qService;
            this.translate = translate;
        }
        DateInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.autoCaptureText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.autoCapture;
            setTimeout(function () {
                _this.questionnaireForm.addControl(_this.question._id, new forms.FormControl(_this.question.value ? new Date(_this.question.value) : null, [_this.qService.validate(_this.question)]));
                _this.question.startTime = _this.question.startTime
                    ? _this.question.startTime
                    : Date.now();
            });
            this.min = this.question.validation.min
                ? new Date(this.question.validation.min)
                : null;
            this.max = this.question.validation.max
                ? new Date(this.question.validation.max)
                : null;
        };
        DateInputComponent.prototype.onChange = function (e) {
            var value = e;
            this.question.value = value;
            this.question.endTime = Date.now();
        };
        DateInputComponent.prototype.autoCapture = function () {
            this.questionnaireForm.controls[this.question._id].patchValue(new Date(Date.now()));
        };
        DateInputComponent.ctorParameters = function () { return [
            { type: SlQuestionnaireService },
            { type: SlTranslateService }
        ]; };
        __decorate([
            core.Input()
        ], DateInputComponent.prototype, "questionnaireForm", void 0);
        __decorate([
            core.Input()
        ], DateInputComponent.prototype, "question", void 0);
        __decorate([
            core.Input()
        ], DateInputComponent.prototype, "autoCaptureText", void 0);
        DateInputComponent = __decorate([
            core.Component({
                selector: 'sl-date-input',
                template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n  class=\"d-flex flex-ai-center flex-jc-space-between\"\n>\n  <div class=\"ui left icon input\">\n    <i class=\"calendar icon\"></i>\n    <input\n      suiDatepicker\n      [pickerMode]=\"'date'\"\n      [pickerUseNativeOnMobile]=\"false\"\n      [formControlName]=\"question?._id\"\n      (pickerSelectedDateChange)=\"onChange($event)\"\n      class=\"question-date-input\"\n      [pickerMinDate]=\"min\"\n      [pickerMaxDate]=\"max\"\n    />\n  </div>\n  <div *ngIf=\"question?.autoCapture && !question?.value\">\n    <button class=\"sb-btn sb-btn-normal sb-btn-primary\" (click)=\"autoCapture()\">\n\t\t{{autoCaptureText}}\n    </button>\n  </div>\n</div>\n",
                styles: [""]
            })
        ], DateInputComponent);
        return DateInputComponent;
    }());

    var NumberInputComponent = /** @class */ (function () {
        function NumberInputComponent(qService, translate) {
            this.qService = qService;
            this.translate = translate;
        }
        NumberInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b;
            this.placeholder = (_b = (_a = this.translate['frmelmnts']) === null || _a === void 0 ? void 0 : _a.lbl) === null || _b === void 0 ? void 0 : _b.enterResponse;
            setTimeout(function () {
                _this.questionnaireForm.addControl(_this.question._id, new forms.FormControl(_this.question.value || null, [
                    _this.qService.validate(_this.question),
                ]));
                _this.question.startTime = _this.question.startTime
                    ? _this.question.startTime
                    : Date.now();
            });
        };
        NumberInputComponent.prototype.onChange = function (e) {
            var value = e.target.value;
            this.question.value = value;
            this.question.endTime = Date.now();
        };
        Object.defineProperty(NumberInputComponent.prototype, "isValid", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NumberInputComponent.prototype, "isTouched", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].touched;
            },
            enumerable: true,
            configurable: true
        });
        NumberInputComponent.ctorParameters = function () { return [
            { type: SlQuestionnaireService },
            { type: SlTranslateService }
        ]; };
        __decorate([
            core.Input()
        ], NumberInputComponent.prototype, "questionnaireForm", void 0);
        __decorate([
            core.Input()
        ], NumberInputComponent.prototype, "question", void 0);
        NumberInputComponent = __decorate([
            core.Component({
                selector: 'sl-number-input',
                template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <input\n    type=\"number\"\n    [formControlName]=\"question?._id\"\n    class=\"sb-form-control\"\n    [placeholder]=\"placeholder\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
                styles: [""]
            })
        ], NumberInputComponent);
        return NumberInputComponent;
    }());

    var RangeInputComponent = /** @class */ (function () {
        function RangeInputComponent(qService) {
            this.qService = qService;
        }
        RangeInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.questionnaireForm.addControl(_this.question._id, new forms.FormControl(_this.question.value || null, [
                    _this.qService.validate(_this.question),
                ]));
                _this.question.startTime = _this.question.startTime
                    ? _this.question.startTime
                    : Date.now();
            });
        };
        RangeInputComponent.prototype.onChange = function (e) {
            var value = e.target.value;
            this.question.value = value;
            this.question.endTime = Date.now();
        };
        Object.defineProperty(RangeInputComponent.prototype, "isValid", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangeInputComponent.prototype, "isTouched", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].touched;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangeInputComponent.prototype, "min", {
            get: function () {
                if (typeof this.question.validation == 'string') {
                    return null;
                }
                return this.question.validation.min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangeInputComponent.prototype, "max", {
            get: function () {
                if (typeof this.question.validation == 'string') {
                    return null;
                }
                return this.question.validation.max;
            },
            enumerable: true,
            configurable: true
        });
        RangeInputComponent.ctorParameters = function () { return [
            { type: SlQuestionnaireService }
        ]; };
        __decorate([
            core.Input()
        ], RangeInputComponent.prototype, "questionnaireForm", void 0);
        __decorate([
            core.Input()
        ], RangeInputComponent.prototype, "question", void 0);
        RangeInputComponent = __decorate([
            core.Component({
                selector: 'sl-range-input',
                template: "<div\n  class=\"\n    d-flex\n    flex-ai-center flex-dc\n    mt-30\n    ng-dirty ng-invalid ng-touched\n    range-wrap\n  \"\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <div class=\"range-value\" id=\"rangeV\">{{ this.question.value }}</div>\n\n  <input\n    id=\"range\"\n    type=\"range\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [ngClass]=\"isValid && isTouched ? 'is-invalid' : 'is-valid'\"\n    step=\"1\"\n    [formControlName]=\"question?._id\"\n    class=\"w-100\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
                styles: [".range-value{width:50px;height:50px;line-height:50px;border-radius:50%;font-size:20px;color:#0274fd;text-align:center;background:#e9e8d9;margin-bottom:17px}input[type=range]{height:34px;-webkit-appearance:none;margin:10px 0;width:100%}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:11px;cursor:pointer;animate:.2s;box-shadow:1px 1px 1px #000;background:#74a9d8;border-radius:1px;border:0 solid #010101}input[type=range]::-webkit-slider-thumb{box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer;-webkit-appearance:none;margin-top:-8px}input[type=range]:focus::-webkit-slider-runnable-track{background:#74a9d8}input[type=range]::-moz-range-track{width:100%;height:11px;cursor:pointer;animate:.2s;box-shadow:1px 1px 1px #000;background:#74a9d8;border-radius:1px;border:0 solid #010101}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer}input[type=range]::-ms-track{width:100%;height:11px;cursor:pointer;animate:.2s;background:0 0;border-color:transparent;color:transparent}input[type=range]::-ms-fill-lower{background:#74a9d8;border:0 solid #010101;border-radius:2px;box-shadow:1px 1px 1px #000}input[type=range]::-ms-fill-upper{background:#74a9d8;border:0 solid #010101;border-radius:2px;box-shadow:1px 1px 1px #000}input[type=range]::-ms-thumb{margin-top:1px;box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer}input[type=range]:focus::-ms-fill-lower{background:#74a9d8}input[type=range]:focus::-ms-fill-upper{background:#74a9d8}"]
            })
        ], RangeInputComponent);
        return RangeInputComponent;
    }());

    var RadioInputComponent = /** @class */ (function () {
        function RadioInputComponent(qService, translate) {
            this.qService = qService;
            this.translate = translate;
            this.dependentParent = new core.EventEmitter();
        }
        RadioInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.hintCloseText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.close;
            setTimeout(function () {
                _this.questionnaireForm.addControl(_this.question._id, new forms.FormControl(_this.question.value || null, _this.qService.validate(_this.question)));
                _this.question.startTime = _this.question.startTime
                    ? _this.question.startTime
                    : Date.now();
                if (_this.question.value) {
                    if (_this.question.children.length) {
                        _this.dependentParent.emit(_this.question);
                    }
                }
            });
        };
        Object.defineProperty(RadioInputComponent.prototype, "isValid", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioInputComponent.prototype, "isTouched", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].touched;
            },
            enumerable: true,
            configurable: true
        });
        RadioInputComponent.prototype.onChange = function (value) {
            this.questionnaireForm.controls[this.question._id].setValue(value);
            this.question.value = value;
            this.question.endTime = Date.now();
            if (this.question.children.length) {
                this.dependentParent.emit(this.question);
            }
        };
        RadioInputComponent.ctorParameters = function () { return [
            { type: SlQuestionnaireService },
            { type: SlTranslateService }
        ]; };
        __decorate([
            core.Input()
        ], RadioInputComponent.prototype, "options", void 0);
        __decorate([
            core.Input()
        ], RadioInputComponent.prototype, "questionnaireForm", void 0);
        __decorate([
            core.Input()
        ], RadioInputComponent.prototype, "question", void 0);
        __decorate([
            core.Output()
        ], RadioInputComponent.prototype, "dependentParent", void 0);
        RadioInputComponent = __decorate([
            core.Component({
                selector: 'sl-radio-input',
                template: "<div *ngIf=\"questionnaireForm?.contains(question._id)\">\n  <div\n    *ngFor=\"let o of options; let optionIndex = index\"\n    [formGroup]=\"questionnaireForm\"\n    class=\"\n      mb-15\n      sb-radio-btn-checkbox sb-radio-btn-primary\n      d-flex\n      flex-ai-baseline\n    \"\n  >\n    <input\n      type=\"radio\"\n      (change)=\"onChange(o.value)\"\n      [name]=\"question._id\"\n      [ngClass]=\"isValid && isTouched ? 'is-invalid' : 'is-valid'\"\n      [value]=\"o.value\"\n      [formControlName]=\"question._id\"\n    />\n    <label>{{ o.label }}</label>\n    <div *ngIf=\"question?.option && question?.option[optionIndex]?.hint\">\n      <i\n        class=\"icon large lightbulb\"\n        (click)=\"\n          isDimmed = !isDimmed; hint = question?.option[optionIndex]?.hint\n        \"\n      ></i>\n    </div>\n  </div>\n</div>\n\n<sui-dimmer [(isDimmed)]=\"isDimmed\" [isClickable]=\"true\">\n  <h4 class=\"ui inverted header\">{{ hint }}</h4>\n  <button\n    type=\"button\"\n    class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n    type=\"submit\"\n  >\n    {{ hintCloseText}}\n  </button>\n</sui-dimmer>\n",
                styles: [""]
            })
        ], RadioInputComponent);
        return RadioInputComponent;
    }());

    var CheckboxInputComponent = /** @class */ (function () {
        function CheckboxInputComponent(qService, translate) {
            this.qService = qService;
            this.translate = translate;
            this.dependentParent = new core.EventEmitter();
        }
        CheckboxInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.hintCloseText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.close;
            setTimeout(function () {
                var optionControl = _this.options.map(function (v) {
                    if (_this.question.value &&
                        _this.question.value.find(function (_v) { return _v == v.value; })) {
                        return new forms.FormControl(v.value);
                    }
                    return new forms.FormControl('');
                });
                _this.questionnaireForm.addControl(_this.question._id, new forms.FormArray(optionControl, _this.qService.validate(_this.question)));
                _this.question.startTime = _this.question.startTime
                    ? _this.question.startTime
                    : Date.now();
                if (_this.question.value.length) {
                    if (_this.question.children.length) {
                        _this.dependentParent.emit(_this.question);
                    }
                }
            });
        };
        CheckboxInputComponent.prototype.onChange = function (oId, isChecked, oIndex) {
            var formArray = this.questionnaireForm.get(this.question._id);
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
        };
        Object.defineProperty(CheckboxInputComponent.prototype, "isValid", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckboxInputComponent.prototype, "isTouched", {
            get: function () {
                return this.questionnaireForm.controls[this.question._id].touched;
            },
            enumerable: true,
            configurable: true
        });
        CheckboxInputComponent.ctorParameters = function () { return [
            { type: SlQuestionnaireService },
            { type: SlTranslateService }
        ]; };
        __decorate([
            core.Input()
        ], CheckboxInputComponent.prototype, "options", void 0);
        __decorate([
            core.Input()
        ], CheckboxInputComponent.prototype, "questionnaireForm", void 0);
        __decorate([
            core.Input()
        ], CheckboxInputComponent.prototype, "question", void 0);
        __decorate([
            core.Output()
        ], CheckboxInputComponent.prototype, "dependentParent", void 0);
        CheckboxInputComponent = __decorate([
            core.Component({
                selector: 'sl-checkbox-input',
                template: "<div *ngIf=\"questionnaireForm?.contains(question._id)\">\n  <div\n    *ngFor=\"let o of options; let i = index\"\n    [formGroup]=\"questionnaireForm\"\n    class=\"mb-15 sb-checkbox sb-checkbox-secondary d-flex flex-ai-baseline\"\n  >\n    <div [formArrayName]=\"question._id\">\n      <sui-checkbox\n        (checkChange)=\"onChange(o.value, $event, i)\"\n        [formControlName]=\"i\"\n      >\n        {{ o.label }}\n      </sui-checkbox>\n    </div>\n    <div *ngIf=\"question?.option && question?.option[i]?.hint\">\n      <i\n        class=\"icon large lightbulb\"\n        (click)=\"isDimmed = !isDimmed; hint = question?.option[i]?.hint\"\n      ></i>\n    </div>\n  </div>\n</div>\n\n<sui-dimmer [(isDimmed)]=\"isDimmed\" [isClickable]=\"true\">\n  <h4 class=\"ui inverted header\">{{ hint }}</h4>\n  <button\n    type=\"button\"\n    class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n    type=\"submit\"\n  >\n    {{ hintCloseText }}\n  </button>\n</sui-dimmer>\n",
                styles: [""]
            })
        ], CheckboxInputComponent);
        return CheckboxInputComponent;
    }());

    var QuesRemarksComponent = /** @class */ (function () {
        function QuesRemarksComponent(translate) {
            this.translate = translate;
            this.remark = '';
            this.saveClicked = new core.EventEmitter();
        }
        QuesRemarksComponent.prototype.ngOnInit = function () {
            var _a;
            this.title = (_a = this.translate['frmelmnts'].lbl) === null || _a === void 0 ? void 0 : _a.remark_title;
            this.remarksAddText = this.translate['frmelmnts'].btn.add;
            this.remark = this.question.remarks;
            this.remark ? (this.showRemarks = true) : false;
        };
        QuesRemarksComponent.prototype.saveRemark = function () {
            this.question.remarks = this.remark;
            this.saveClicked.emit({ value: this.remark });
        };
        QuesRemarksComponent.prototype.deleteRemark = function () {
            this.remark = '';
            this.saveRemark();
            this.showRemarks = false;
        };
        QuesRemarksComponent.ctorParameters = function () { return [
            { type: SlTranslateService }
        ]; };
        __decorate([
            core.Output()
        ], QuesRemarksComponent.prototype, "saveClicked", void 0);
        __decorate([
            core.Input()
        ], QuesRemarksComponent.prototype, "question", void 0);
        QuesRemarksComponent = __decorate([
            core.Component({
                selector: 'sl-ques-remarks',
                template: "<div class=\"d-flex flex-ai-center flex-jc-space-between my-10\">\n  <h5 class=\"my-10\">{{ title }}</h5>\n  <button\n    class=\"sb-btn sb-btn-normal sb-btn-primary\"\n    *ngIf=\"!remark.length\"\n    (click)=\"showRemarks = true\"\n  >\n    {{ remarksAddText }}\n  </button>\n  <span *ngIf=\"remark.length\" (click)=\"deleteRemark()\"\n    ><i class=\"trash large icon\"></i\n  ></span>\n</div>\n\n<div class=\"d-flex flex-ai-end\" *ngIf=\"showRemarks\">\n  <textarea\n    rows=\"3\"\n    class=\"w-100\"\n    [(ngModel)]=\"remark\"\n    (ngModelChange)=\"saveRemark()\"\n  >\n  </textarea>\n</div>\n",
                styles: [""]
            })
        ], QuesRemarksComponent);
        return QuesRemarksComponent;
    }());

    var SlUtilsService = /** @class */ (function () {
        function SlUtilsService(modalService) {
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
        SlUtilsService.prototype.alert = function (meta) {
            var button = [];
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
            var alertMeta = {
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
        };
        SlUtilsService.ctorParameters = function () { return [
            { type: ng2SemanticUiV9.SuiModalService }
        ]; };
        SlUtilsService.ɵprov = core.ɵɵdefineInjectable({ factory: function SlUtilsService_Factory() { return new SlUtilsService(core.ɵɵinject(ng2SemanticUiV9.SuiModalService)); }, token: SlUtilsService, providedIn: "root" });
        SlUtilsService = __decorate([
            core.Injectable({
                providedIn: 'root',
            })
        ], SlUtilsService);
        return SlUtilsService;
    }());

    var AttachmentComponent = /** @class */ (function () {
        function AttachmentComponent(translate, utils) {
            this.translate = translate;
            this.utils = utils;
        }
        AttachmentComponent.prototype.ngOnInit = function () { };
        AttachmentComponent.prototype.basicUpload = function (files) {
            var _this = this;
            var sizeMB = +(files[0].size / 1000 / 1000).toFixed(4);
            if (sizeMB > 20) {
                this.fileLimitCross();
                return;
            }
            this.formData = new FormData();
            Array.from(files).forEach(function (f) { return _this.formData.append('file', f); });
            this.preSignedUrl(this.getFileNames(this.formData));
        };
        AttachmentComponent.prototype.fileLimitCross = function () {
            var alertMeta = {
                size: 'tiny',
                bodyType: 'text',
                data: this.translate['frmelmnts'].alert.fileLimitCross20,
                buttonClass: 'single-btn',
                acceptText: this.translate['frmelmnts'].btn.ok,
                cancelText: null,
            };
            this.utils.alert(alertMeta);
        };
        AttachmentComponent.prototype.getFileNames = function (formData) {
            var files = [];
            formData.forEach(function (element) {
                files.push(element.name);
            });
            return files;
        };
        AttachmentComponent.prototype.preSignedUrl = function (files) {
            var _this = this;
            var payload = {};
            payload['ref'] = 'survey';
            payload['request'] = {};
            payload['request'][this.data.submissionId] = {
                files: files,
            };
            this.utils.getPreSingedUrls(payload).subscribe(function (imageData) {
                var presignedUrlData = imageData['result'][_this.data.submissionId].files[0];
                _this.formData.append('url', presignedUrlData.url);
                _this.utils.cloudStorageUpload(_this.formData).subscribe(function (success) {
                    var e_1, _a;
                    if (success.status === 200) {
                        var obj = {
                            name: _this.getFileNames(_this.formData)[0],
                            url: presignedUrlData.url.split('?')[0],
                        };
                        try {
                            for (var _b = __values(Object.keys(presignedUrlData.payload)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var key = _c.value;
                                obj[key] = presignedUrlData['payload'][key];
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        _this.data.files.push(obj);
                        var alertMeta = {
                            size: 'tiny',
                            bodyType: 'text',
                            data: _this.translate['frmelmnts'].alert.evidenceUploaded,
                            buttonClass: 'single-btn',
                            acceptText: _this.translate['frmelmnts'].btn.ok,
                            cancelText: null,
                            type: 'uploaded',
                        };
                        _this.utils.alert(alertMeta);
                    }
                    else {
                        _this.utils.error(_this.translate['frmelmnts'].message.unableToUpload);
                    }
                }, function (error) {
                    _this.utils.error(_this.translate['frmelmnts'].message.unableToUpload);
                });
            }, function (error) {
                console.log(error);
            });
        };
        AttachmentComponent.prototype.extension = function (name) {
            return name.split('.').pop();
        };
        AttachmentComponent.prototype.openFile = function (file) {
            window.open(file.url, '_blank');
        };
        AttachmentComponent.prototype.deleteAttachment = function (fileIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var alertMeta, accepted;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            alertMeta = {
                                size: 'mini',
                                bodyType: 'text',
                                data: this.translate['frmelmnts'].alert.confirmEvidenceDelete,
                                buttonClass: 'double-btn',
                                acceptText: this.translate['frmelmnts'].btn.ok,
                                cancelText: this.translate['frmelmnts'].btn.no,
                            };
                            return [4 /*yield*/, this.utils.alert(alertMeta)];
                        case 1:
                            accepted = _a.sent();
                            if (!accepted) {
                                return [2 /*return*/];
                            }
                            this.data.files.splice(fileIndex, 1);
                            return [2 /*return*/];
                    }
                });
            });
        };
        AttachmentComponent.prototype.onAddApproval = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var html, alertMeta, returnData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            html = "\n    " + this.translate['frmelmnts'].alert.evidence_content_policy + "<a href='/term-of-use.html' target=\"_blank\">" + this.translate['frmelmnts'].alert.evidence_content_policy_label + "</a> ." + this.translate['frmelmnts'].alert.uploadevidencecontent + "\n    ";
                            alertMeta = {
                                size: 'tiny',
                                bodyType: 'checkbox',
                                data: html,
                                buttonClass: 'double-btn',
                                acceptText: this.translate['frmelmnts'].btn.upload,
                                cancelText: this.translate['frmelmnts'].btn.donotupload,
                            };
                            return [4 /*yield*/, this.utils.alert(alertMeta)];
                        case 1:
                            returnData = _a.sent();
                            if (!returnData) {
                                this.notAccepted();
                                return [2 /*return*/];
                            }
                            file.click();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AttachmentComponent.prototype.notAccepted = function () {
            var alertMeta = {
                size: 'tiny',
                bodyType: 'text',
                data: this.translate['frmelmnts'].alert.uploadTermsRejected,
                buttonClass: 'single-btn',
                acceptText: this.translate['frmelmnts'].btn.ok,
                cancelText: null,
                type: 'notAccepted',
            };
            this.utils.alert(alertMeta);
        };
        AttachmentComponent.ctorParameters = function () { return [
            { type: SlTranslateService },
            { type: SlUtilsService }
        ]; };
        __decorate([
            core.Input()
        ], AttachmentComponent.prototype, "data", void 0);
        AttachmentComponent = __decorate([
            core.Component({
                selector: 'sl-attachment',
                template: "<label for=\"file-upload\" class=\"custom-file-upload\"></label>\n<input\n  id=\"file-upload\"\n  type=\"file\"\n  #file\n  (change)=\"basicUpload($event.target.files)\"\n/>\n<div class=\"d-flex\">\n  <div class=\"bs-1 p-20\" (click)=\"onAddApproval(file)\">\n    <i class=\"plus icon\"></i>\n  </div>\n  <div\n    *ngFor=\"let item of data.files; let i = index\"\n    (click)=\"openFile(item)\"\n    class=\"area\"\n  >\n    <a\n      class=\"remove-image\"\n      (click)=\"$event.stopPropagation(); deleteAttachment(i)\"\n      >&#215;</a\n    >\n    <div *ngIf=\"extension(item.name) == 'png'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'jpg'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'jpeg'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'pdf'\" class=\"mx-10\">\n      <i class=\"file pdf outline icon\"></i>\n    </div>\n  </div>\n</div>\n",
                styles: ["input[type=file]{display:none}.area{position:relative}.area a{display:inline}.area i{font-size:40px}.remove-image{display:none;position:absolute;top:-10px;right:2px;border-radius:10em;padding:2px 6px 3px;text-decoration:none;background:#555;border:3px solid #fff;color:#fff!important;box-shadow:0 2px 6px rgba(0,0,0,.5),inset 0 2px 4px rgba(0,0,0,.3);text-shadow:0 1px 2px rgba(0,0,0,.5);transition:background .5s}.remove-image:hover{background:#e54e4e;padding:3px 7px 5px;top:-11px;right:2px}.remove-image:active{background:#e54e4e;top:-10px;right:2px}.bs-1{background-color:grey}"]
            })
        ], AttachmentComponent);
        return AttachmentComponent;
    }());

    var InputComponent = /** @class */ (function () {
        function InputComponent(translate, qService) {
            this.translate = translate;
            this.qService = qService;
            this.dimmerCloseText = this.translate['frmelmnts'].btn.close;
        }
        Object.defineProperty(InputComponent.prototype, "reponseType", {
            get: function () {
                return exports.ResponseType;
            },
            enumerable: true,
            configurable: true
        });
        InputComponent.prototype.toggleQuestion = function (parent) {
            var _this = this;
            var children = parent.children;
            this.questions.map(function (q, i) {
                if (children.includes(q._id)) {
                    var child = _this.questions[i];
                    child['canDisplay'] = _this.canDisplayChildQ(child, i);
                    if (child['canDisplay'] == false) {
                        child.value = '';
                        _this.questionnaireForm.removeControl(child._id);
                    }
                }
            });
        };
        InputComponent.prototype.canDisplayChildQ = function (currentQuestion, currentQuestionIndex) {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f;
            var display = true;
            if (typeof currentQuestion.visibleIf == 'string' || null || undefined) {
                return false; //if condition not present
            }
            try {
                for (var _g = __values(this.questions), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var question = _h.value;
                    try {
                        for (var _j = (e_2 = void 0, __values(currentQuestion.visibleIf)), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var condition = _k.value;
                            if (condition._id === question._id) {
                                var expression = [];
                                if (condition.operator != '===') {
                                    if (question.responseType === 'multiselect') {
                                        try {
                                            for (var _l = (e_3 = void 0, __values(question.value)), _m = _l.next(); !_m.done; _m = _l.next()) {
                                                var parentValue = _m.value;
                                                try {
                                                    for (var _o = (e_4 = void 0, __values(condition.value)), _p = _o.next(); !_p.done; _p = _o.next()) {
                                                        var value = _p.value;
                                                        expression.push('(', "'" + parentValue + "'", '===', "'" + value + "'", ')', condition.operator);
                                                    }
                                                }
                                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                                finally {
                                                    try {
                                                        if (_p && !_p.done && (_d = _o.return)) _d.call(_o);
                                                    }
                                                    finally { if (e_4) throw e_4.error; }
                                                }
                                            }
                                        }
                                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                        finally {
                                            try {
                                                if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
                                            }
                                            finally { if (e_3) throw e_3.error; }
                                        }
                                    }
                                    else {
                                        try {
                                            for (var _q = (e_5 = void 0, __values(condition.value)), _r = _q.next(); !_r.done; _r = _q.next()) {
                                                var value = _r.value;
                                                expression.push('(', "'" + question.value + "'", '===', "'" + value + "'", ')', condition.operator);
                                            }
                                        }
                                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                        finally {
                                            try {
                                                if (_r && !_r.done && (_e = _q.return)) _e.call(_q);
                                            }
                                            finally { if (e_5) throw e_5.error; }
                                        }
                                    }
                                    expression.pop();
                                }
                                else {
                                    if (question.responseType === 'multiselect') {
                                        try {
                                            for (var _s = (e_6 = void 0, __values(question.value)), _t = _s.next(); !_t.done; _t = _s.next()) {
                                                var value = _t.value;
                                                expression.push('(', "'" + condition.value + "'", '===', "'" + value + "'", ')', '||');
                                            }
                                        }
                                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                        finally {
                                            try {
                                                if (_t && !_t.done && (_f = _s.return)) _f.call(_s);
                                            }
                                            finally { if (e_6) throw e_6.error; }
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
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return display;
        };
        InputComponent.ctorParameters = function () { return [
            { type: SlTranslateService },
            { type: SlQuestionnaireService }
        ]; };
        __decorate([
            core.Input()
        ], InputComponent.prototype, "questions", void 0);
        __decorate([
            core.Input()
        ], InputComponent.prototype, "questionnaireForm", void 0);
        InputComponent = __decorate([
            core.Component({
                selector: 'sl-input',
                template: "<div *ngFor=\"let question of questions; let qi = index\">\n  <div\n    [ngClass]=\"{\n      'ui card question-card sb--card relative9':\n        question.responseType != 'pageQuestions'\n    }\"\n    *ngIf=\"!question.visibleIf.length || question.canDisplay == true\"\n  >\n    <div [ngClass]=\"{ content: question.responseType != 'pageQuestions' }\">\n      <div class=\"d-flex flex-ai-flex-start flex-jc-space-between\">\n        <div\n          *ngFor=\"let q of question.question; let qai = index\"\n          [ngClass]=\"{\n            'mb-20': q.length,\n            'valid-response': questionnaireForm?.controls[question._id]?.valid\n          }\"\n        >\n          <div class=\"sb-h5\">\n            {{ qai == 0 ? qi + 1 + \")\" : \"\" }}&nbsp;{{ q }}\n          </div>\n        </div>\n        <div *ngIf=\"question?.hint\">\n          <i\n            class=\"icon large lightbulb\"\n            (click)=\"dimmerIndex = qi; isDimmed = !isDimmed\"\n          ></i>\n        </div>\n      </div>\n      <div *ngIf=\"question?.tip\" class=\"mb-10\">\n        <small class=\"mb-10\">{{ question?.tip }}</small>\n      </div>\n      <div class=\"sbt-page-content-questionnaireFormarea'\">\n        <sl-text-input\n          *ngIf=\"question.responseType == reponseType.TEXT\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-text-input>\n        <sl-date-input\n          *ngIf=\"question.responseType == reponseType.DATE\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-date-input>\n        <sl-number-input\n          *ngIf=\"question.responseType == reponseType.NUMBER\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-number-input>\n        <sl-range-input\n          *ngIf=\"question.responseType == reponseType.SLIDER\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-range-input>\n        <sl-radio-input\n          *ngIf=\"question.responseType == reponseType.RADIO\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n          [options]=\"question.options\"\n          (dependentParent)=\"toggleQuestion($event)\"\n        ></sl-radio-input>\n        <sl-checkbox-input\n          *ngIf=\"question.responseType == reponseType.MULTISELECT\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n          [options]=\"question.options\"\n          (dependentParent)=\"toggleQuestion($event)\"\n        ></sl-checkbox-input>\n        <sl-page-questions\n          *ngIf=\"\n            question.responseType == reponseType.PAGEQUESTIONS;\n            pageQuestions\n          \"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-page-questions>\n        <sl-matrix-questions\n          *ngIf=\"question.responseType == reponseType.MATRIX\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-matrix-questions>\n        <sl-ques-remarks\n          [question]=\"question\"\n          *ngIf=\"question.showRemarks\"\n        ></sl-ques-remarks>\n        <sl-attachment\n          [data]=\"{\n            submissionId: qService.getSubmissionId(),\n            files: question.fileName\n          }\"\n          *ngIf=\"question.file\"\n        ></sl-attachment>\n        <sui-dimmer\n          [(isDimmed)]=\"isDimmed\"\n          [isClickable]=\"true\"\n          *ngIf=\"dimmerIndex == qi && question?.hint\"\n        >\n          <div class=\"center\">\n            <h4 class=\"ui inverted header\">{{ question?.hint }}</h4>\n            <button\n              type=\"button\"\n              class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n              type=\"submit\"\n            >\n              {{ dimmerCloseText }}\n            </button>\n          </div>\n        </sui-dimmer>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".question-card{border-radius:28px;padding:20px;width:100%;margin-bottom:20px}.question-card:last-child{margin-bottom:20px}:host .question-card.sb--card,:host .sb-radio-btn-checkbox{width:100%;background-color:var(--sb-card-bg);color:var(--primary-color)}:host label{color:var(--body-color)}:host ::ng-deep .question-card .sb-checkbox label,:host ::ng-deep .question-card .sb-radio-btn-checkbox label{color:var(--body-color);font-weight:400}:host ::ng-deep .question-card input:focus,:host ::ng-deep .question-card input:focus~label{color:var(--body-color)}:host ::ng-deep .question-card #range{background-color:var(--sb-card-bg)}:host ::ng-deep .question-card .student-card{background-color:var(--sb-card-bg)}:host ::ng-deep .question-card .question-date-input,:host ::ng-deep .question-card input:active.question-date-input,:host ::ng-deep .question-card input:focus.question-date-input{background:var(--cc-sbcard-data1-bg);color:var(--sb-prominent-filter-title)}.remarks{margin-top:15px}.valid-response{color:var(--green)}"]
            })
        ], InputComponent);
        return InputComponent;
    }());

    var PageQuestionsComponent = /** @class */ (function () {
        function PageQuestionsComponent() {
        }
        PageQuestionsComponent.prototype.ngOnInit = function () { };
        __decorate([
            core.Input()
        ], PageQuestionsComponent.prototype, "questionnaireForm", void 0);
        __decorate([
            core.Input()
        ], PageQuestionsComponent.prototype, "question", void 0);
        PageQuestionsComponent = __decorate([
            core.Component({
                selector: 'sl-page-questions',
                template: "<sl-input\n  [questions]=\"question.pageQuestions\"\n  [questionnaireForm]=\"questionnaireForm\"\n></sl-input>\n",
                styles: [""]
            })
        ], PageQuestionsComponent);
        return PageQuestionsComponent;
    }());

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
                _this.matrixForm = _this.fb.group({}, forms.Validators.required);
                _this.questionnaireForm.addControl(_this.question._id, new forms.FormArray([], [forms.Validators.required]));
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
                    _this.questionnaireForm.controls[_this.question._id].push(new forms.FormControl(obj));
                    if (lodashEs.isEmpty(obj)) {
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
            this.formAsArray.push(new forms.FormControl([], [forms.Validators.required]));
        };
        MatrixQuestionsComponent.prototype.viewInstance = function (i) {
            this.matrixForm.reset();
            if (this.formAsArray.controls[i].value) {
                this.matrixForm.patchValue(this.formAsArray.controls[i].value);
            }
            var config = new ng2SemanticUiV9.TemplateModalConfig(this.modalTemplate);
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
            { type: ng2SemanticUiV9.SuiModalService },
            { type: forms.FormBuilder },
            { type: SlUtilsService }
        ]; };
        __decorate([
            core.Input()
        ], MatrixQuestionsComponent.prototype, "questionnaireForm", void 0);
        __decorate([
            core.Input()
        ], MatrixQuestionsComponent.prototype, "question", void 0);
        __decorate([
            core.ViewChild('modalTemplate')
        ], MatrixQuestionsComponent.prototype, "modalTemplate", void 0);
        MatrixQuestionsComponent = __decorate([
            core.Component({
                selector: 'sl-matrix-questions',
                template: "<div class=\"d-flex flex-jc-flex-end\">\n  <button class=\"sb-btn sb-btn-normal sb-btn-primary\" (click)=\"addInstances()\">\n    {{ addText }}\n    {{ question?.instanceIdentifier }}\n  </button>\n</div>\n<div\n  class=\"ui card student-card\"\n  *ngFor=\"let instance of question?.value; let i = index\"\n>\n  <div class=\"content flex-jc-space-between\">\n    <div (click)=\"viewInstance(i)\" style=\"flex: 1\">\n      <span> {{ question?.instanceIdentifier }} {{ i + 1 }}</span>\n      <!-- <span class=\"modified\" *ngIf=\"getLastModified(instance)\"\n      >Last Modified {{ \"todo\" }}</span\n    > -->\n      <!-- todo -->\n    </div>\n    <div>\n      <i class=\"trash large icon\" (click)=\"deleteInstanceAlert(i)\"></i>\n    </div>\n  </div>\n</div>\n\n<sui-modal\n  [mustScroll]=\"true\"\n  [isClosable]=\"true\"\n  [transitionDuration]=\"0\"\n  [size]=\"'normal'\"\n  class=\"sb-modal\"\n  appBodyScroll\n  (dismissed)=\"showBadgeAssingModel = false\"\n  *ngIf=\"showBadgeAssingModel\"\n  #modal\n>\n  <!--Header-->\n  <div class=\"sb-modal-header\">\n    {{ context?.heading }}\n  </div>\n  <!--/Header-->\n  <!--Content-->\n  <div class=\"sb-modal-content\">\n    <sl-input\n      [questions]=\"context.questions\"\n      [questionnaireForm]=\"matrixForm\"\n    ></sl-input>\n  </div>\n  <!--/Content-->\n\n  <!--Actions-->\n  <div class=\"sb-modal-actions\">\n    <button\n      [disabled]=\"!matrixForm?.valid\"\n      type=\"button\"\n      (click)=\"matrixSubmit(context.index)\"\n      [ngClass]=\"{\n        'sb-btn sb-btn-normal': true,\n        'sb-btn-primary': matrixForm?.valid,\n        'sb-btn-disabled': !matrixForm?.valid\n      }\"\n    >\n      {{ submitText }}\n    </button>\n    <button\n      class=\"sb-btn sb-btn-normal sb-btn-outline-primary\"\n      type=\"button\"\n      (click)=\"showBadgeAssingModel = false\"\n    >\n      {{ cancelText }}\n    </button>\n  </div>\n  <!--/Actions-->\n</sui-modal>\n",
                styles: [".card{width:100%;border-radius:90px}.content{display:flex;flex-direction:row}.ui.card>.content:after,.ui.cards>.card>.content:after{content:none}"]
            })
        ], MatrixQuestionsComponent);
        return MatrixQuestionsComponent;
    }());

    var SlQuestionnaireModule = /** @class */ (function () {
        function SlQuestionnaireModule() {
        }
        SlQuestionnaireModule = __decorate([
            core.NgModule({
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
                imports: [common.CommonModule, forms.FormsModule, forms.ReactiveFormsModule, ng2SemanticUiV9.SuiModule],
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
        return SlQuestionnaireModule;
    }());

    exports.AttachmentComponent = AttachmentComponent;
    exports.CheckboxInputComponent = CheckboxInputComponent;
    exports.DateInputComponent = DateInputComponent;
    exports.InputComponent = InputComponent;
    exports.MatrixQuestionsComponent = MatrixQuestionsComponent;
    exports.NumberInputComponent = NumberInputComponent;
    exports.PageQuestionsComponent = PageQuestionsComponent;
    exports.QuesRemarksComponent = QuesRemarksComponent;
    exports.RadioInputComponent = RadioInputComponent;
    exports.RangeInputComponent = RangeInputComponent;
    exports.SlQuestionnaireModule = SlQuestionnaireModule;
    exports.SlQuestionnaireService = SlQuestionnaireService;
    exports.SlTranslateService = SlTranslateService;
    exports.SlUtilsService = SlUtilsService;
    exports.TextInputComponent = TextInputComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sl-questionnaire.umd.js.map
