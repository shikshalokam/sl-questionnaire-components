import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
export declare class TextInputComponent implements OnInit {
    private qService;
    private translate;
    text: string;
    questionnaireForm: FormGroup;
    question: Question;
    placeholder: any;
    constructor(qService: SlQuestionnaireService, translate: SlTranslateService);
    ngOnInit(): void;
    get isValid(): boolean;
    get isTouched(): boolean;
    onChange(e: Event): void;
}
