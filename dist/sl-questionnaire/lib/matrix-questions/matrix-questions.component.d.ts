import { OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalTemplate, SuiModalService } from 'ng2-semantic-ui-v9';
import { MatrixQuestion, Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlUtilsService } from '../services/utils.service';
export interface IContext {
    questions: Question[];
    heading: string;
    index: number;
}
export declare class MatrixQuestionsComponent implements OnInit {
    private translate;
    modalService: SuiModalService;
    fb: FormBuilder;
    private utils;
    addText: string;
    submitText: string;
    cancelText: string;
    questionnaireForm: FormGroup;
    question: MatrixQuestion;
    matrixForm: FormGroup;
    modalTemplate: ModalTemplate<IContext, string, string>;
    context: IContext;
    showBadgeAssingModel: boolean;
    constructor(translate: SlTranslateService, modalService: SuiModalService, fb: FormBuilder, utils: SlUtilsService);
    ngOnInit(): void;
    initializeMatrix(): void;
    addInstances(): void;
    viewInstance(i: any): void;
    get formAsArray(): FormArray;
    matrixSubmit(index: any): void;
    deleteInstanceAlert(index: any): Promise<void>;
}
