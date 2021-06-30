import { FormGroup } from '@angular/forms';
import { Question, ResponseType } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
export declare class InputComponent {
    private translate;
    qService: SlQuestionnaireService;
    questions: Array<Question>;
    questionnaireForm: FormGroup;
    selectedIndex: number;
    dimmerIndex: any;
    isDimmed: any;
    dimmerCloseText: any;
    constructor(translate: SlTranslateService, qService: SlQuestionnaireService);
    get reponseType(): typeof ResponseType;
    toggleQuestion(parent: any): void;
    canDisplayChildQ(currentQuestion: Question, currentQuestionIndex: number): boolean;
}
