import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageQuestion } from '../interfaces/questionnaire.type';
export declare class PageQuestionsComponent implements OnInit {
    questionnaireForm: FormGroup;
    question: PageQuestion;
    constructor();
    ngOnInit(): void;
}
