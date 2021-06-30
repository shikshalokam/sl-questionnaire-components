import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
export declare class DateInputComponent implements OnInit {
    private qService;
    private translate;
    date: any;
    min: Date;
    max: Date;
    questionnaireForm: FormGroup;
    question: Question;
    autoCaptureText: String;
    constructor(qService: SlQuestionnaireService, translate: SlTranslateService);
    ngOnInit(): void;
    onChange(e: string): void;
    autoCapture(): void;
}
