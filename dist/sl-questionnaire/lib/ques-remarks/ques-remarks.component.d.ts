import { EventEmitter, OnInit } from '@angular/core';
import { Question } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
export declare class QuesRemarksComponent implements OnInit {
    private translate;
    remark: string;
    showRemarks: any;
    saveClicked: EventEmitter<any>;
    question: Question;
    title: String;
    remarksAddText: String;
    constructor(translate: SlTranslateService);
    ngOnInit(): void;
    saveRemark(): void;
    deleteRemark(): void;
}
