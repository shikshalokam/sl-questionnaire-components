import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../interfaces/questionnaire.type';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
export declare class RangeInputComponent implements OnInit {
    qService: SlQuestionnaireService;
    questionnaireForm: FormGroup;
    question: Question;
    constructor(qService: SlQuestionnaireService);
    ngOnInit(): void;
    onChange(e: Event): void;
    get isValid(): boolean;
    get isTouched(): boolean;
    get min(): string;
    get max(): string;
}
