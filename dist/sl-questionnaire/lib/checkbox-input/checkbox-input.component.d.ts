import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
export declare class CheckboxInputComponent implements OnInit {
    qService: SlQuestionnaireService;
    translate: SlTranslateService;
    options: any;
    questionnaireForm: FormGroup;
    question: Question;
    hintCloseText: string;
    dependentParent: EventEmitter<Question>;
    isDimmed: any;
    hint: any;
    constructor(qService: SlQuestionnaireService, translate: SlTranslateService);
    ngOnInit(): void;
    onChange(oId: string, isChecked: boolean, oIndex: number): void;
    get isValid(): boolean;
    get isTouched(): boolean;
}
