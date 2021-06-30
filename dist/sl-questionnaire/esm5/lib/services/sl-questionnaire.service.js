import { __assign, __decorate, __values } from "tslib";
import { Injectable } from '@angular/core';
import { ResponseType, } from '../interfaces/questionnaire.type';
import * as i0 from "@angular/core";
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
                    if (data.responseType == ResponseType.MULTISELECT) {
                        return control.value.some(function (v) { return v != ''; })
                            ? null
                            : { err: 'Select at least one option' };
                    }
                    if (data.responseType == ResponseType.SLIDER) {
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
    SlQuestionnaireService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SlQuestionnaireService_Factory() { return new SlQuestionnaireService(); }, token: SlQuestionnaireService, providedIn: "root" });
    SlQuestionnaireService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], SlQuestionnaireService);
    return SlQuestionnaireService;
}());
export { SlQuestionnaireService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2wtcXVlc3Rpb25uYWlyZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zbC1xdWVzdGlvbm5haXJlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUdMLFlBQVksR0FDYixNQUFNLGtDQUFrQyxDQUFDOztBQUsxQztJQUVFO1FBQUEsaUJBQWdCO1FBQ2hCLGFBQVEsR0FBRyxVQUFDLElBQWM7WUFDeEIsT0FBTyxVQUFDLE9BQXdCO2dCQUM5QixJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUU7b0JBQ3RDLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDN0IsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtvQkFDekIsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZFLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLHlCQUF5QixFQUFFLENBQUM7aUJBQzlEO2dCQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO3dCQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUM7cUJBQ3RDO29CQUNELElBQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEMsT0FB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RTtTQUNoQixDQUFDO0lBQ0osQ0FBQzs7SUF2T1Usc0JBQXNCO1FBSGxDLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxzQkFBc0IsQ0F3T2xDO2lDQW5QRDtDQW1QQyxBQXhPRCxJQXdPQztTQXhPWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgRXZpZGVuY2UsXG4gIFF1ZXN0aW9uLFxuICBSZXNwb25zZVR5cGUsXG59IGZyb20gJy4uL2ludGVyZmFjZXMvcXVlc3Rpb25uYWlyZS50eXBlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNsUXVlc3Rpb25uYWlyZVNlcnZpY2Uge1xuICBwcml2YXRlIF9zdWJtaXNzaW9uSWQ6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7fVxuICB2YWxpZGF0ZSA9IChkYXRhOiBRdWVzdGlvbik6IFZhbGlkYXRvckZuID0+IHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gfCBudWxsID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZGF0YS52YWxpZGF0aW9uID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKCFkYXRhLnZhbGlkYXRpb24ucmVxdWlyZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoZGF0YS52YWxpZGF0aW9uLnJlZ2V4KSB7XG4gICAgICAgIGNvbnN0IGZvcmJpZGRlbiA9IHRoaXMudGVzdFJlZ2V4KGRhdGEudmFsaWRhdGlvbi5yZWdleCwgY29udHJvbC52YWx1ZSk7XG4gICAgICAgIHJldHVybiBmb3JiaWRkZW4gPyBudWxsIDogeyBlcnI6ICdJbnZhbGlkIGNoYXJhY3RlciBmb3VuZCcgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEudmFsaWRhdGlvbi5Jc051bWJlcikge1xuICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4geyBlcnI6ICdOdW1iZXIgbm90IGVudGVyZWQnIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9yYmlkZGVuID0gIWlzTmFOKGNvbnRyb2wudmFsdWUpO1xuICAgICAgICByZXR1cm4gZm9yYmlkZGVuID8gbnVsbCA6IHsgZXJyOiAnT25seSBudW1iZXJzIGFsbG93ZWQnIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLnZhbGlkYXRpb24ucmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKCFjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHsgZXJyOiAnUmVxdWlyZWQgZmllbGQnIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5yZXNwb25zZVR5cGUgPT0gUmVzcG9uc2VUeXBlLk1VTFRJU0VMRUNUKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWUuc29tZSgodikgPT4gdiAhPSAnJylcbiAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgOiB7IGVycjogJ1NlbGVjdCBhdCBsZWFzdCBvbmUgb3B0aW9uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEucmVzcG9uc2VUeXBlID09IFJlc3BvbnNlVHlwZS5TTElERVIpIHtcbiAgICAgICAgICBsZXQgbWluID0gZGF0YS52YWxpZGF0aW9uLm1pbjtcbiAgICAgICAgICBsZXQgbWF4ID0gZGF0YS52YWxpZGF0aW9uLm1heDtcbiAgICAgICAgICByZXR1cm4gbWluIDw9IGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZSA8PSBtYXhcbiAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgOiB7IGVycjogJ1NlbGVjdGVkIHZhbHVlICBub3Qgd2l0aGluIHJhbmdlJyB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBwdWJsaWMgdGVzdFJlZ2V4KHJlZ2V4RXhwcmVzc2lvbjogUmVnRXhwLCB2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4RXhwcmVzc2lvbik7XG4gICAgcmV0dXJuIHJlZ2V4LnRlc3QodmFsdWUpO1xuICB9XG5cbiAgc2V0U3VibWlzc2lvbklkKHN1Ym1pc3Npb25JZDogYW55KSB7XG4gICAgdGhpcy5fc3VibWlzc2lvbklkID0gc3VibWlzc2lvbklkO1xuICB9XG4gIGdldFN1Ym1pc3Npb25JZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VibWlzc2lvbklkO1xuICB9XG5cbiAgbWFwU3VibWlzc2lvblRvQXNzZXNzbWVudChkYXRhKSB7XG4gICAgY29uc3QgYXNzZXNzbWVudCA9IGRhdGEuYXNzZXNzbWVudDtcblxuICAgIGZvciAoY29uc3QgZXZpZGVuY2Ugb2YgYXNzZXNzbWVudC5ldmlkZW5jZXMpIHtcbiAgICAgIGNvbnN0IHZhbGlkU3VibWlzc2lvbiA9IGFzc2Vzc21lbnQuc3VibWlzc2lvbnNbZXZpZGVuY2UuZXh0ZXJuYWxJZF07XG4gICAgICBpZiAodmFsaWRTdWJtaXNzaW9uKSB7XG4gICAgICAgIGV2aWRlbmNlLm5vdEFwcGxpY2FibGUgPSB2YWxpZFN1Ym1pc3Npb24ubm90QXBwbGljYWJsZTtcbiAgICAgICAgaWYgKGV2aWRlbmNlLm5vdEFwcGxpY2FibGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBldmlkZW5jZS5zZWN0aW9ucykge1xuICAgICAgICAgIGZvciAoY29uc3QgcXVlc3Rpb24gb2Ygc2VjdGlvbi5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbi5yZXNwb25zZVR5cGUgPT09ICdwYWdlUXVlc3Rpb25zJykge1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHF1ZXN0aW9ucyBvZiBxdWVzdGlvbi5wYWdlUXVlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLnZhbHVlID1cbiAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5yZXNwb25zZVR5cGUgIT09ICdtYXRyaXgnXG4gICAgICAgICAgICAgICAgICAgID8gdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbcXVlc3Rpb25zLl9pZF0udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnN0cnVjdE1hdHJpeFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRTdWJtaXNzaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZpZGVuY2UuZXh0ZXJuYWxJZFxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLnJlbWFya3MgPSB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbnMuX2lkXVxuICAgICAgICAgICAgICAgICAgPyB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbnMuX2lkXS5yZW1hcmtzXG4gICAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5maWxlTmFtZSA9IHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW3F1ZXN0aW9ucy5faWRdXG4gICAgICAgICAgICAgICAgICA/IHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW3F1ZXN0aW9ucy5faWRdLmZpbGVOYW1lXG4gICAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICB2YWxpZFN1Ym1pc3Npb24uYW5zd2VycyAmJlxuICAgICAgICAgICAgICB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbi5faWRdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcXVlc3Rpb24udmFsdWUgPVxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uLnJlc3BvbnNlVHlwZSAhPT0gJ21hdHJpeCdcbiAgICAgICAgICAgICAgICAgID8gdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbcXVlc3Rpb24uX2lkXS52YWx1ZVxuICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvbnN0cnVjdE1hdHJpeFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgIHZhbGlkU3VibWlzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICBldmlkZW5jZS5leHRlcm5hbElkXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHF1ZXN0aW9uLnJlbWFya3MgPSB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbi5faWRdXG4gICAgICAgICAgICAgICAgPyB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbi5faWRdLnJlbWFya3NcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgICBxdWVzdGlvbi5maWxlTmFtZSA9IHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW3F1ZXN0aW9uLl9pZF1cbiAgICAgICAgICAgICAgICA/IHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW3F1ZXN0aW9uLl9pZF0uZmlsZU5hbWVcbiAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3VibWlzc2lvbklkKGFzc2Vzc21lbnQuc3VibWlzc2lvbklkKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGNvbnN0cnVjdE1hdHJpeFZhbHVlKHZhbGlkU3VibWlzc2lvbiwgbWF0cml4UXVlc3Rpb24sIGVjbUlkKSB7XG4gICAgbWF0cml4UXVlc3Rpb24udmFsdWUgPSBbXTtcbiAgICBpZiAoXG4gICAgICB2YWxpZFN1Ym1pc3Npb24uYW5zd2VycyAmJlxuICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbbWF0cml4UXVlc3Rpb24uX2lkXSAmJlxuICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbbWF0cml4UXVlc3Rpb24uX2lkXS52YWx1ZVxuICAgICkge1xuICAgICAgZm9yIChjb25zdCBhbnN3ZXIgb2YgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbbWF0cml4UXVlc3Rpb24uX2lkXS52YWx1ZSkge1xuICAgICAgICBtYXRyaXhRdWVzdGlvbi52YWx1ZS5wdXNoKFxuICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWF0cml4UXVlc3Rpb24uaW5zdGFuY2VRdWVzdGlvbnMpKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbWF0cml4UXVlc3Rpb24udmFsdWUuZm9yRWFjaCgoaW5zdGFuY2UsIGluZGV4KSA9PiB7XG4gICAgICAgIGluc3RhbmNlLmZvckVhY2goKHF1ZXN0aW9uLCBpbnN0YW5jZUluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbbWF0cml4UXVlc3Rpb24uX2lkXSAmJlxuICAgICAgICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbbWF0cml4UXVlc3Rpb24uX2lkXS52YWx1ZVtpbmRleF1bXG4gICAgICAgICAgICAgIHF1ZXN0aW9uLl9pZFxuICAgICAgICAgICAgXVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcXVlc3Rpb24udmFsdWUgPVxuICAgICAgICAgICAgICB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1ttYXRyaXhRdWVzdGlvbi5faWRdLnZhbHVlW2luZGV4XVtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbi5faWRcbiAgICAgICAgICAgICAgXS52YWx1ZTtcbiAgICAgICAgICAgIHF1ZXN0aW9uLnJlbWFya3MgPVxuICAgICAgICAgICAgICB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1ttYXRyaXhRdWVzdGlvbi5faWRdLnZhbHVlW2luZGV4XVtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbi5faWRcbiAgICAgICAgICAgICAgXS5yZW1hcmtzO1xuICAgICAgICAgICAgcXVlc3Rpb24uZmlsZU5hbWUgPVxuICAgICAgICAgICAgICB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1ttYXRyaXhRdWVzdGlvbi5faWRdLnZhbHVlW2luZGV4XVtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbi5faWRcbiAgICAgICAgICAgICAgXS5maWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWF0cml4UXVlc3Rpb24udmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRFdmlkZW5jZURhdGEoZXZpZGVuY2U6IEV2aWRlbmNlLCBmb3JtVmFsdWVzOiBvYmplY3QpIHtcbiAgICBsZXQgc2VjdGlvbnMgPSBldmlkZW5jZS5zZWN0aW9ucztcbiAgICBsZXQgYW5zd2VycyA9IHRoaXMuZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbnMsIGZvcm1WYWx1ZXMpO1xuICAgIGxldCBwYXlsb2FkRGF0YSA9IHtcbiAgICAgIGV4dGVybmFsSWQ6IGV2aWRlbmNlLmV4dGVybmFsSWQsXG4gICAgICBhbnN3ZXJzOiBhbnN3ZXJzLFxuICAgICAgc3RhcnRUaW1lOiBldmlkZW5jZS5zdGFydFRpbWUsXG4gICAgICBlbmRUaW1lOiBEYXRlLm5vdygpLFxuICAgIH07XG4gICAgcmV0dXJuIHBheWxvYWREYXRhO1xuICB9XG5cbiAgZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbnMsIGZvcm1WYWx1ZXMpIHtcbiAgICBsZXQgYW5zd2VycyA9IHt9O1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzZWN0aW9ucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGFuc3dlcnMgPSB7XG4gICAgICAgIC4uLmFuc3dlcnMsXG4gICAgICAgIC4uLnRoaXMuY3JlYXRlcGF5bG9hZChzZWN0aW9uc1tpbmRleF0ucXVlc3Rpb25zLCBmb3JtVmFsdWVzKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBhbnN3ZXJzO1xuICB9XG5cbiAgY3JlYXRlcGF5bG9hZChxdWVzdGlvbnMsIGZvcm1WYWx1ZXMpIHtcbiAgICBsZXQgYW5zd2VycyA9IHt9O1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBxdWVzdGlvbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBsZXQgY3VycmVudFF1ZXN0aW9uID0gcXVlc3Rpb25zW2luZGV4XTtcbiAgICAgIGlmIChjdXJyZW50UXVlc3Rpb24ucmVzcG9uc2VUeXBlID09ICdwYWdlUXVlc3Rpb25zJykge1xuICAgICAgICBhbnN3ZXJzID0ge1xuICAgICAgICAgIC4uLmFuc3dlcnMsXG4gICAgICAgICAgLi4udGhpcy5jcmVhdGVwYXlsb2FkKGN1cnJlbnRRdWVzdGlvbi5wYWdlUXVlc3Rpb25zLCBmb3JtVmFsdWVzKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFF1ZXN0aW9uLnJlc3BvbnNlVHlwZSA9PSAnbWF0cml4Jykge1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3VycmVudFF1ZXN0aW9uLnZhbHVlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGZvcm1WYWx1ZXNbY3VycmVudFF1ZXN0aW9uLl9pZF1baW5kZXhdID0gdGhpcy5jcmVhdGVwYXlsb2FkKFxuICAgICAgICAgICAgY3VycmVudFF1ZXN0aW9uLnZhbHVlW2luZGV4XSxcbiAgICAgICAgICAgIGZvcm1WYWx1ZXNbY3VycmVudFF1ZXN0aW9uLl9pZF1baW5kZXhdXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgcGVyUXVlc3Rpb25EYXRhID0gdGhpcy5mb3JtYXRUb1BheWxvYWQoY3VycmVudFF1ZXN0aW9uLCBmb3JtVmFsdWVzKTtcbiAgICAgIGFuc3dlcnNbY3VycmVudFF1ZXN0aW9uLl9pZF0gPSBwZXJRdWVzdGlvbkRhdGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuc3dlcnM7XG4gIH1cblxuICBmb3JtYXRUb1BheWxvYWQoY3VycmVudFF1ZXN0aW9uLCBmb3JtVmFsdWVzKSB7XG4gICAgbGV0IHZhbHVlID1cbiAgICAgIGN1cnJlbnRRdWVzdGlvbi5yZXNwb25zZVR5cGUgIT0gJ21hdHJpeCdcbiAgICAgICAgPyBjdXJyZW50UXVlc3Rpb24udmFsdWVcbiAgICAgICAgOiBmb3JtVmFsdWVzW2N1cnJlbnRRdWVzdGlvbi5faWRdO1xuICAgIHJldHVybiB7XG4gICAgICBxaWQ6IGN1cnJlbnRRdWVzdGlvbi5faWQsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICByZW1hcmtzOiBjdXJyZW50UXVlc3Rpb24ucmVtYXJrcyxcbiAgICAgIGZpbGVOYW1lOiBjdXJyZW50UXVlc3Rpb24uZmlsZU5hbWUsIC8vdG9kbyxcbiAgICAgIGdwc0xvY2F0aW9uOiAnJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgcXVlc3Rpb246IGN1cnJlbnRRdWVzdGlvbi5xdWVzdGlvbixcbiAgICAgICAgbGFiZWxzOiBmb3JtVmFsdWVzW2N1cnJlbnRRdWVzdGlvbi5faWRdLFxuICAgICAgICByZXNwb25zZVR5cGU6IGN1cnJlbnRRdWVzdGlvbi5yZXNwb25zZVR5cGUsXG4gICAgICAgIGZpbGVzTm90VXBsb2FkZWQ6IFtdLCAvL3RvZG9cbiAgICAgIH0sXG4gICAgICBzdGFydFRpbWU6IGN1cnJlbnRRdWVzdGlvbi5zdGFydFRpbWUsXG4gICAgICBlbmRUaW1lOiBjdXJyZW50UXVlc3Rpb24uZW5kVGltZSxcbiAgICAgIGNyaXRlcmlhSWQ6IGN1cnJlbnRRdWVzdGlvbi5wYXlsb2FkLmNyaXRlcmlhSWQsXG4gICAgICByZXNwb25zZVR5cGU6IGN1cnJlbnRRdWVzdGlvbi5yZXNwb25zZVR5cGUsXG4gICAgICBldmlkZW5jZU1ldGhvZDogY3VycmVudFF1ZXN0aW9uLmV2aWRlbmNlTWV0aG9kLFxuICAgICAgcnVicmljTGV2ZWw6ICcnLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==