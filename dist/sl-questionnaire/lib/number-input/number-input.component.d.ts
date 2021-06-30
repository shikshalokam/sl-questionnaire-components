import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
export declare class NumberInputComponent implements OnInit {
    private qService;
    private translate;
    placeholder: any;
    response: string;
    questionnaireForm: FormGroup;
    question: Question;
    constructor(qService: SlQuestionnaireService, translate: SlTranslateService);
    ngOnInit(): void;
    onChange(e: Event): void;
    get isValid(): boolean;
    get isTouched(): boolean;
}
