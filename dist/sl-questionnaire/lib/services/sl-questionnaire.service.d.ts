import { ValidatorFn } from '@angular/forms';
import { Evidence, Question } from '../interfaces/questionnaire.type';
export declare class SlQuestionnaireService {
    private _submissionId;
    constructor();
    validate: (data: Question) => ValidatorFn;
    testRegex(regexExpression: RegExp, value: string): boolean;
    setSubmissionId(submissionId: any): void;
    getSubmissionId(): string;
    mapSubmissionToAssessment(data: any): any;
    constructMatrixValue(validSubmission: any, matrixQuestion: any, ecmId: any): any;
    getEvidenceData(evidence: Evidence, formValues: object): {
        externalId: string;
        answers: {};
        startTime: number;
        endTime: number;
    };
    getSectionData(sections: any, formValues: any): {};
    createpayload(questions: any, formValues: any): {};
    formatToPayload(currentQuestion: any, formValues: any): {
        qid: any;
        value: any;
        remarks: any;
        fileName: any;
        gpsLocation: string;
        payload: {
            question: any;
            labels: any;
            responseType: any;
            filesNotUploaded: any[];
        };
        startTime: any;
        endTime: any;
        criteriaId: any;
        responseType: any;
        evidenceMethod: any;
        rubricLevel: string;
    };
}
