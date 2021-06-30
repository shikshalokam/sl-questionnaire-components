import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { ResponseType, } from '../interfaces/questionnaire.type';
import * as i0 from "@angular/core";
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
SlQuestionnaireService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SlQuestionnaireService_Factory() { return new SlQuestionnaireService(); }, token: SlQuestionnaireService, providedIn: "root" });
SlQuestionnaireService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], SlQuestionnaireService);
export { SlQuestionnaireService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2wtcXVlc3Rpb25uYWlyZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zbC1xdWVzdGlvbm5haXJlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUdMLFlBQVksR0FDYixNQUFNLGtDQUFrQyxDQUFDOztBQUsxQyxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUVqQztRQUNBLGFBQVEsR0FBRyxDQUFDLElBQWMsRUFBZSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxPQUF3QixFQUFpQyxFQUFFO2dCQUNqRSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUU7b0JBQ3RDLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDN0IsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtvQkFDekIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZFLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLHlCQUF5QixFQUFFLENBQUM7aUJBQzlEO2dCQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO3dCQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUM7cUJBQ3RDO29CQUNELE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxD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Q2pCLENBQUM7SUFFRCxlQUFlLENBQUMsZUFBZSxFQUFFLFVBQVU7UUFDekMsSUFBSSxLQUFLLEdBQ1AsZUFBZSxDQUFDLFlBQVksSUFBSSxRQUFRO1lBQ3RDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSztZQUN2QixDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxPQUFPO1lBQ0wsR0FBRyxFQUFFLGVBQWUsQ0FBQyxHQUFHO1lBQ3hCLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLGVBQWUsQ0FBQyxPQUFPO1lBQ2hDLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUTtZQUNsQyxXQUFXLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRTtnQkFDUCxRQUFRLEVBQUUsZUFBZSxDQUFDLFFBQVE7Z0JBQ2xDLE1BQU0sRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztnQkFDdkMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxZQUFZO2dCQUMxQyxnQkFBZ0IsRUFBRSxFQUFFO2FBQ3JCO1lBQ0QsU0FBUyxFQUFFLGVBQWUsQ0FBQyxTQUFTO1lBQ3BDLE9BQU8sRUFBRSxlQUFlLENBQUMsT0FBTztZQUNoQyxVQUFVLEVBQUUsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQzlDLFlBQVksRUFBRSxlQUFlLENBQUMsWUFBWTtZQUMxQyxjQUFjLEVBQUUsZUFBZSxDQUFDLGNBQWM7WUFDOUMsV0FBVyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBOztBQXhPWSxzQkFBc0I7SUFIbEMsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLHNCQUFzQixDQXdPbEM7U0F4T1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEV2aWRlbmNlLFxuICBRdWVzdGlvbixcbiAgUmVzcG9uc2VUeXBlLFxufSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfc3VibWlzc2lvbklkOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgdmFsaWRhdGUgPSAoZGF0YTogUXVlc3Rpb24pOiBWYWxpZGF0b3JGbiA9PiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGRhdGEudmFsaWRhdGlvbiA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICghZGF0YS52YWxpZGF0aW9uLnJlcXVpcmVkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEudmFsaWRhdGlvbi5yZWdleCkge1xuICAgICAgICBjb25zdCBmb3JiaWRkZW4gPSB0aGlzLnRlc3RSZWdleChkYXRhLnZhbGlkYXRpb24ucmVnZXgsIGNvbnRyb2wudmFsdWUpO1xuICAgICAgICByZXR1cm4gZm9yYmlkZGVuID8gbnVsbCA6IHsgZXJyOiAnSW52YWxpZCBjaGFyYWN0ZXIgZm91bmQnIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLnZhbGlkYXRpb24uSXNOdW1iZXIpIHtcbiAgICAgICAgaWYgKCFjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHsgZXJyOiAnTnVtYmVyIG5vdCBlbnRlcmVkJyB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcmJpZGRlbiA9ICFpc05hTihjb250cm9sLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGZvcmJpZGRlbiA/IG51bGwgOiB7IGVycjogJ09ubHkgbnVtYmVycyBhbGxvd2VkJyB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS52YWxpZGF0aW9uLnJlcXVpcmVkKSB7XG4gICAgICAgIGlmICghY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB7IGVycjogJ1JlcXVpcmVkIGZpZWxkJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEucmVzcG9uc2VUeXBlID09IFJlc3BvbnNlVHlwZS5NVUxUSVNFTEVDVCkge1xuICAgICAgICAgIHJldHVybiBjb250cm9sLnZhbHVlLnNvbWUoKHYpID0+IHYgIT0gJycpXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogeyBlcnI6ICdTZWxlY3QgYXQgbGVhc3Qgb25lIG9wdGlvbicgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLnJlc3BvbnNlVHlwZSA9PSBSZXNwb25zZVR5cGUuU0xJREVSKSB7XG4gICAgICAgICAgbGV0IG1pbiA9IGRhdGEudmFsaWRhdGlvbi5taW47XG4gICAgICAgICAgbGV0IG1heCA9IGRhdGEudmFsaWRhdGlvbi5tYXg7XG4gICAgICAgICAgcmV0dXJuIG1pbiA8PSBjb250cm9sLnZhbHVlICYmIGNvbnRyb2wudmFsdWUgPD0gbWF4XG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogeyBlcnI6ICdTZWxlY3RlZCB2YWx1ZSAgbm90IHdpdGhpbiByYW5nZScgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgcHVibGljIHRlc3RSZWdleChyZWdleEV4cHJlc3Npb246IFJlZ0V4cCwgdmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleEV4cHJlc3Npb24pO1xuICAgIHJldHVybiByZWdleC50ZXN0KHZhbHVlKTtcbiAgfVxuXG4gIHNldFN1Ym1pc3Npb25JZChzdWJtaXNzaW9uSWQ6IGFueSkge1xuICAgIHRoaXMuX3N1Ym1pc3Npb25JZCA9IHN1Ym1pc3Npb25JZDtcbiAgfVxuICBnZXRTdWJtaXNzaW9uSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1Ym1pc3Npb25JZDtcbiAgfVxuXG4gIG1hcFN1Ym1pc3Npb25Ub0Fzc2Vzc21lbnQoZGF0YSkge1xuICAgIGNvbnN0IGFzc2Vzc21lbnQgPSBkYXRhLmFzc2Vzc21lbnQ7XG5cbiAgICBmb3IgKGNvbnN0IGV2aWRlbmNlIG9mIGFzc2Vzc21lbnQuZXZpZGVuY2VzKSB7XG4gICAgICBjb25zdCB2YWxpZFN1Ym1pc3Npb24gPSBhc3Nlc3NtZW50LnN1Ym1pc3Npb25zW2V2aWRlbmNlLmV4dGVybmFsSWRdO1xuICAgICAgaWYgKHZhbGlkU3VibWlzc2lvbikge1xuICAgICAgICBldmlkZW5jZS5ub3RBcHBsaWNhYmxlID0gdmFsaWRTdWJtaXNzaW9uLm5vdEFwcGxpY2FibGU7XG4gICAgICAgIGlmIChldmlkZW5jZS5ub3RBcHBsaWNhYmxlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgZXZpZGVuY2Uuc2VjdGlvbnMpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHF1ZXN0aW9uIG9mIHNlY3Rpb24ucXVlc3Rpb25zKSB7XG4gICAgICAgICAgICBpZiAocXVlc3Rpb24ucmVzcG9uc2VUeXBlID09PSAncGFnZVF1ZXN0aW9ucycpIHtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBxdWVzdGlvbnMgb2YgcXVlc3Rpb24ucGFnZVF1ZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy52YWx1ZSA9XG4gICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucmVzcG9uc2VUeXBlICE9PSAnbWF0cml4J1xuICAgICAgICAgICAgICAgICAgICA/IHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW3F1ZXN0aW9ucy5faWRdLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5jb25zdHJ1Y3RNYXRyaXhWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkU3VibWlzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2aWRlbmNlLmV4dGVybmFsSWRcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5yZW1hcmtzID0gdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbcXVlc3Rpb25zLl9pZF1cbiAgICAgICAgICAgICAgICAgID8gdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbcXVlc3Rpb25zLl9pZF0ucmVtYXJrc1xuICAgICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMuZmlsZU5hbWUgPSB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbnMuX2lkXVxuICAgICAgICAgICAgICAgICAgPyB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbnMuX2lkXS5maWxlTmFtZVxuICAgICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnMgJiZcbiAgICAgICAgICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbcXVlc3Rpb24uX2lkXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHF1ZXN0aW9uLnZhbHVlID1cbiAgICAgICAgICAgICAgICBxdWVzdGlvbi5yZXNwb25zZVR5cGUgIT09ICdtYXRyaXgnXG4gICAgICAgICAgICAgICAgICA/IHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW3F1ZXN0aW9uLl9pZF0udmFsdWVcbiAgICAgICAgICAgICAgICAgIDogdGhpcy5jb25zdHJ1Y3RNYXRyaXhWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICB2YWxpZFN1Ym1pc3Npb24sXG4gICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgZXZpZGVuY2UuZXh0ZXJuYWxJZFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBxdWVzdGlvbi5yZW1hcmtzID0gdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbcXVlc3Rpb24uX2lkXVxuICAgICAgICAgICAgICAgID8gdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbcXVlc3Rpb24uX2lkXS5yZW1hcmtzXG4gICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgICAgcXVlc3Rpb24uZmlsZU5hbWUgPSB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbi5faWRdXG4gICAgICAgICAgICAgICAgPyB2YWxpZFN1Ym1pc3Npb24uYW5zd2Vyc1txdWVzdGlvbi5faWRdLmZpbGVOYW1lXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldFN1Ym1pc3Npb25JZChhc3Nlc3NtZW50LnN1Ym1pc3Npb25JZCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb25zdHJ1Y3RNYXRyaXhWYWx1ZSh2YWxpZFN1Ym1pc3Npb24sIG1hdHJpeFF1ZXN0aW9uLCBlY21JZCkge1xuICAgIG1hdHJpeFF1ZXN0aW9uLnZhbHVlID0gW107XG4gICAgaWYgKFxuICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnMgJiZcbiAgICAgIHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW21hdHJpeFF1ZXN0aW9uLl9pZF0gJiZcbiAgICAgIHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW21hdHJpeFF1ZXN0aW9uLl9pZF0udmFsdWVcbiAgICApIHtcbiAgICAgIGZvciAoY29uc3QgYW5zd2VyIG9mIHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW21hdHJpeFF1ZXN0aW9uLl9pZF0udmFsdWUpIHtcbiAgICAgICAgbWF0cml4UXVlc3Rpb24udmFsdWUucHVzaChcbiAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1hdHJpeFF1ZXN0aW9uLmluc3RhbmNlUXVlc3Rpb25zKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIG1hdHJpeFF1ZXN0aW9uLnZhbHVlLmZvckVhY2goKGluc3RhbmNlLCBpbmRleCkgPT4ge1xuICAgICAgICBpbnN0YW5jZS5mb3JFYWNoKChxdWVzdGlvbiwgaW5zdGFuY2VJbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW21hdHJpeFF1ZXN0aW9uLl9pZF0gJiZcbiAgICAgICAgICAgIHZhbGlkU3VibWlzc2lvbi5hbnN3ZXJzW21hdHJpeFF1ZXN0aW9uLl9pZF0udmFsdWVbaW5kZXhdW1xuICAgICAgICAgICAgICBxdWVzdGlvbi5faWRcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHF1ZXN0aW9uLnZhbHVlID1cbiAgICAgICAgICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbbWF0cml4UXVlc3Rpb24uX2lkXS52YWx1ZVtpbmRleF1bXG4gICAgICAgICAgICAgICAgcXVlc3Rpb24uX2lkXG4gICAgICAgICAgICAgIF0udmFsdWU7XG4gICAgICAgICAgICBxdWVzdGlvbi5yZW1hcmtzID1cbiAgICAgICAgICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbbWF0cml4UXVlc3Rpb24uX2lkXS52YWx1ZVtpbmRleF1bXG4gICAgICAgICAgICAgICAgcXVlc3Rpb24uX2lkXG4gICAgICAgICAgICAgIF0ucmVtYXJrcztcbiAgICAgICAgICAgIHF1ZXN0aW9uLmZpbGVOYW1lID1cbiAgICAgICAgICAgICAgdmFsaWRTdWJtaXNzaW9uLmFuc3dlcnNbbWF0cml4UXVlc3Rpb24uX2lkXS52YWx1ZVtpbmRleF1bXG4gICAgICAgICAgICAgICAgcXVlc3Rpb24uX2lkXG4gICAgICAgICAgICAgIF0uZmlsZU5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdHJpeFF1ZXN0aW9uLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0RXZpZGVuY2VEYXRhKGV2aWRlbmNlOiBFdmlkZW5jZSwgZm9ybVZhbHVlczogb2JqZWN0KSB7XG4gICAgbGV0IHNlY3Rpb25zID0gZXZpZGVuY2Uuc2VjdGlvbnM7XG4gICAgbGV0IGFuc3dlcnMgPSB0aGlzLmdldFNlY3Rpb25EYXRhKHNlY3Rpb25zLCBmb3JtVmFsdWVzKTtcbiAgICBsZXQgcGF5bG9hZERhdGEgPSB7XG4gICAgICBleHRlcm5hbElkOiBldmlkZW5jZS5leHRlcm5hbElkLFxuICAgICAgYW5zd2VyczogYW5zd2VycyxcbiAgICAgIHN0YXJ0VGltZTogZXZpZGVuY2Uuc3RhcnRUaW1lLFxuICAgICAgZW5kVGltZTogRGF0ZS5ub3coKSxcbiAgICB9O1xuICAgIHJldHVybiBwYXlsb2FkRGF0YTtcbiAgfVxuXG4gIGdldFNlY3Rpb25EYXRhKHNlY3Rpb25zLCBmb3JtVmFsdWVzKSB7XG4gICAgbGV0IGFuc3dlcnMgPSB7fTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2VjdGlvbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBhbnN3ZXJzID0ge1xuICAgICAgICAuLi5hbnN3ZXJzLFxuICAgICAgICAuLi50aGlzLmNyZWF0ZXBheWxvYWQoc2VjdGlvbnNbaW5kZXhdLnF1ZXN0aW9ucywgZm9ybVZhbHVlcyksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gYW5zd2VycztcbiAgfVxuXG4gIGNyZWF0ZXBheWxvYWQocXVlc3Rpb25zLCBmb3JtVmFsdWVzKSB7XG4gICAgbGV0IGFuc3dlcnMgPSB7fTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcXVlc3Rpb25zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgbGV0IGN1cnJlbnRRdWVzdGlvbiA9IHF1ZXN0aW9uc1tpbmRleF07XG4gICAgICBpZiAoY3VycmVudFF1ZXN0aW9uLnJlc3BvbnNlVHlwZSA9PSAncGFnZVF1ZXN0aW9ucycpIHtcbiAgICAgICAgYW5zd2VycyA9IHtcbiAgICAgICAgICAuLi5hbnN3ZXJzLFxuICAgICAgICAgIC4uLnRoaXMuY3JlYXRlcGF5bG9hZChjdXJyZW50UXVlc3Rpb24ucGFnZVF1ZXN0aW9ucywgZm9ybVZhbHVlcyksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRRdWVzdGlvbi5yZXNwb25zZVR5cGUgPT0gJ21hdHJpeCcpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGN1cnJlbnRRdWVzdGlvbi52YWx1ZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBmb3JtVmFsdWVzW2N1cnJlbnRRdWVzdGlvbi5faWRdW2luZGV4XSA9IHRoaXMuY3JlYXRlcGF5bG9hZChcbiAgICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbi52YWx1ZVtpbmRleF0sXG4gICAgICAgICAgICBmb3JtVmFsdWVzW2N1cnJlbnRRdWVzdGlvbi5faWRdW2luZGV4XVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHBlclF1ZXN0aW9uRGF0YSA9IHRoaXMuZm9ybWF0VG9QYXlsb2FkKGN1cnJlbnRRdWVzdGlvbiwgZm9ybVZhbHVlcyk7XG4gICAgICBhbnN3ZXJzW2N1cnJlbnRRdWVzdGlvbi5faWRdID0gcGVyUXVlc3Rpb25EYXRhO1xuICAgIH1cblxuICAgIHJldHVybiBhbnN3ZXJzO1xuICB9XG5cbiAgZm9ybWF0VG9QYXlsb2FkKGN1cnJlbnRRdWVzdGlvbiwgZm9ybVZhbHVlcykge1xuICAgIGxldCB2YWx1ZSA9XG4gICAgICBjdXJyZW50UXVlc3Rpb24ucmVzcG9uc2VUeXBlICE9ICdtYXRyaXgnXG4gICAgICAgID8gY3VycmVudFF1ZXN0aW9uLnZhbHVlXG4gICAgICAgIDogZm9ybVZhbHVlc1tjdXJyZW50UXVlc3Rpb24uX2lkXTtcbiAgICByZXR1cm4ge1xuICAgICAgcWlkOiBjdXJyZW50UXVlc3Rpb24uX2lkLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVtYXJrczogY3VycmVudFF1ZXN0aW9uLnJlbWFya3MsXG4gICAgICBmaWxlTmFtZTogY3VycmVudFF1ZXN0aW9uLmZpbGVOYW1lLCAvL3RvZG8sXG4gICAgICBncHNMb2NhdGlvbjogJycsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHF1ZXN0aW9uOiBjdXJyZW50UXVlc3Rpb24ucXVlc3Rpb24sXG4gICAgICAgIGxhYmVsczogZm9ybVZhbHVlc1tjdXJyZW50UXVlc3Rpb24uX2lkXSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiBjdXJyZW50UXVlc3Rpb24ucmVzcG9uc2VUeXBlLFxuICAgICAgICBmaWxlc05vdFVwbG9hZGVkOiBbXSwgLy90b2RvXG4gICAgICB9LFxuICAgICAgc3RhcnRUaW1lOiBjdXJyZW50UXVlc3Rpb24uc3RhcnRUaW1lLFxuICAgICAgZW5kVGltZTogY3VycmVudFF1ZXN0aW9uLmVuZFRpbWUsXG4gICAgICBjcml0ZXJpYUlkOiBjdXJyZW50UXVlc3Rpb24ucGF5bG9hZC5jcml0ZXJpYUlkLFxuICAgICAgcmVzcG9uc2VUeXBlOiBjdXJyZW50UXVlc3Rpb24ucmVzcG9uc2VUeXBlLFxuICAgICAgZXZpZGVuY2VNZXRob2Q6IGN1cnJlbnRRdWVzdGlvbi5ldmlkZW5jZU1ldGhvZCxcbiAgICAgIHJ1YnJpY0xldmVsOiAnJyxcbiAgICB9O1xuICB9XG59XG4iXX0=