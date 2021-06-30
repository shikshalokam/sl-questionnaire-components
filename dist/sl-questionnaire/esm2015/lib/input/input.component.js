import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ResponseType } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
let InputComponent = class InputComponent {
    constructor(translate, qService) {
        this.translate = translate;
        this.qService = qService;
        this.dimmerCloseText = this.translate['frmelmnts'].btn.close;
    }
    get reponseType() {
        return ResponseType;
    }
    toggleQuestion(parent) {
        const { children } = parent;
        this.questions.map((q, i) => {
            if (children.includes(q._id)) {
                let child = this.questions[i];
                child['canDisplay'] = this.canDisplayChildQ(child, i);
                if (child['canDisplay'] == false) {
                    child.value = '';
                    this.questionnaireForm.removeControl(child._id);
                }
            }
        });
    }
    canDisplayChildQ(currentQuestion, currentQuestionIndex) {
        let display = true;
        if (typeof currentQuestion.visibleIf == 'string' || null || undefined) {
            return false; //if condition not present
        }
        for (const question of this.questions) {
            for (const condition of currentQuestion.visibleIf) {
                if (condition._id === question._id) {
                    let expression = [];
                    if (condition.operator != '===') {
                        if (question.responseType === 'multiselect') {
                            for (const parentValue of question.value) {
                                for (const value of condition.value) {
                                    expression.push('(', "'" + parentValue + "'", '===', "'" + value + "'", ')', condition.operator);
                                }
                            }
                        }
                        else {
                            for (const value of condition.value) {
                                expression.push('(', "'" + question.value + "'", '===', "'" + value + "'", ')', condition.operator);
                            }
                        }
                        expression.pop();
                    }
                    else {
                        if (question.responseType === 'multiselect') {
                            for (const value of question.value) {
                                expression.push('(', "'" + condition.value + "'", '===', "'" + value + "'", ')', '||');
                            }
                            expression.pop();
                        }
                        else {
                            expression.push('(', "'" + question.value + "'", condition.operator, "'" + condition.value + "'", ')');
                        }
                    }
                    if (!eval(expression.join(''))) {
                        this.questions[currentQuestionIndex].isCompleted = true;
                        return false;
                    }
                    else {
                        // this.questions[currentQuestionIndex].isCompleted =
                        //   this.utils.isQuestionComplete(currentQuestion);
                    }
                }
            }
        }
        return display;
    }
};
InputComponent.ctorParameters = () => [
    { type: SlTranslateService },
    { type: SlQuestionnaireService }
];
__decorate([
    Input()
], InputComponent.prototype, "questions", void 0);
__decorate([
    Input()
], InputComponent.prototype, "questionnaireForm", void 0);
InputComponent = __decorate([
    Component({
        selector: 'sl-input',
        template: "<div *ngFor=\"let question of questions; let qi = index\">\n  <div\n    [ngClass]=\"{\n      'ui card question-card sb--card relative9':\n        question.responseType != 'pageQuestions'\n    }\"\n    *ngIf=\"!question.visibleIf.length || question.canDisplay == true\"\n  >\n    <div [ngClass]=\"{ content: question.responseType != 'pageQuestions' }\">\n      <div class=\"d-flex flex-ai-flex-start flex-jc-space-between\">\n        <div\n          *ngFor=\"let q of question.question; let qai = index\"\n          [ngClass]=\"{\n            'mb-20': q.length,\n            'valid-response': questionnaireForm?.controls[question._id]?.valid\n          }\"\n        >\n          <div class=\"sb-h5\">\n            {{ qai == 0 ? qi + 1 + \")\" : \"\" }}&nbsp;{{ q }}\n          </div>\n        </div>\n        <div *ngIf=\"question?.hint\">\n          <i\n            class=\"icon large lightbulb\"\n            (click)=\"dimmerIndex = qi; isDimmed = !isDimmed\"\n          ></i>\n        </div>\n      </div>\n      <div *ngIf=\"question?.tip\" class=\"mb-10\">\n        <small class=\"mb-10\">{{ question?.tip }}</small>\n      </div>\n      <div class=\"sbt-page-content-questionnaireFormarea'\">\n        <sl-text-input\n          *ngIf=\"question.responseType == reponseType.TEXT\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-text-input>\n        <sl-date-input\n          *ngIf=\"question.responseType == reponseType.DATE\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-date-input>\n        <sl-number-input\n          *ngIf=\"question.responseType == reponseType.NUMBER\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-number-input>\n        <sl-range-input\n          *ngIf=\"question.responseType == reponseType.SLIDER\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-range-input>\n        <sl-radio-input\n          *ngIf=\"question.responseType == reponseType.RADIO\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n          [options]=\"question.options\"\n          (dependentParent)=\"toggleQuestion($event)\"\n        ></sl-radio-input>\n        <sl-checkbox-input\n          *ngIf=\"question.responseType == reponseType.MULTISELECT\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n          [options]=\"question.options\"\n          (dependentParent)=\"toggleQuestion($event)\"\n        ></sl-checkbox-input>\n        <sl-page-questions\n          *ngIf=\"\n            question.responseType == reponseType.PAGEQUESTIONS;\n            pageQuestions\n          \"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-page-questions>\n        <sl-matrix-questions\n          *ngIf=\"question.responseType == reponseType.MATRIX\"\n          [questionnaireForm]=\"questionnaireForm\"\n          [question]=\"question\"\n        ></sl-matrix-questions>\n        <sl-ques-remarks\n          [question]=\"question\"\n          *ngIf=\"question.showRemarks\"\n        ></sl-ques-remarks>\n        <sl-attachment\n          [data]=\"{\n            submissionId: qService.getSubmissionId(),\n            files: question.fileName\n          }\"\n          *ngIf=\"question.file\"\n        ></sl-attachment>\n        <sui-dimmer\n          [(isDimmed)]=\"isDimmed\"\n          [isClickable]=\"true\"\n          *ngIf=\"dimmerIndex == qi && question?.hint\"\n        >\n          <div class=\"center\">\n            <h4 class=\"ui inverted header\">{{ question?.hint }}</h4>\n            <button\n              type=\"button\"\n              class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n              type=\"submit\"\n            >\n              {{ dimmerCloseText }}\n            </button>\n          </div>\n        </sui-dimmer>\n      </div>\n    </div>\n  </div>\n</div>\n",
        styles: [".question-card{border-radius:28px;padding:20px;width:100%;margin-bottom:20px}.question-card:last-child{margin-bottom:20px}:host .question-card.sb--card,:host .sb-radio-btn-checkbox{width:100%;background-color:var(--sb-card-bg);color:var(--primary-color)}:host label{color:var(--body-color)}:host ::ng-deep .question-card .sb-checkbox label,:host ::ng-deep .question-card .sb-radio-btn-checkbox label{color:var(--body-color);font-weight:400}:host ::ng-deep .question-card input:focus,:host ::ng-deep .question-card input:focus~label{color:var(--body-color)}:host ::ng-deep .question-card #range{background-color:var(--sb-card-bg)}:host ::ng-deep .question-card .student-card{background-color:var(--sb-card-bg)}:host ::ng-deep .question-card .question-date-input,:host ::ng-deep .question-card input:active.question-date-input,:host ::ng-deep .question-card input:focus.question-date-input{background:var(--cc-sbcard-data1-bg);color:var(--sb-prominent-filter-title)}.remarks{margin-top:15px}.valid-response{color:var(--green)}"]
    })
], InputComponent);
export { InputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC9pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBWSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RSxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBUXpCLFlBQW9CLFNBQTZCLEVBQVEsUUFBK0I7UUFBcEUsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFBUSxhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQUZ4RixvQkFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUVtQyxDQUFDO0lBRTVGLElBQVcsV0FBVztRQUNwQixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQU07UUFDbkIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUU1QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQs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T0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGLENBQUE7O1lBNUZnQyxrQkFBa0I7WUFBaUIsc0JBQXNCOztBQVAvRTtJQUFSLEtBQUssRUFBRTtpREFBNEI7QUFDM0I7SUFBUixLQUFLLEVBQUU7eURBQThCO0FBRjNCLGNBQWM7SUFMMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFVBQVU7UUFDcEIsNCtIQUFxQzs7S0FFdEMsQ0FBQztHQUNXLGNBQWMsQ0FvRzFCO1NBcEdZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFF1ZXN0aW9uLCBSZXNwb25zZVR5cGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5pbXBvcnQgeyBTbFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmFuc2xhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2wtcXVlc3Rpb25uYWlyZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2wtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbnB1dC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHF1ZXN0aW9uczogQXJyYXk8UXVlc3Rpb24+O1xuICBASW5wdXQoKSBxdWVzdGlvbm5haXJlRm9ybTogRm9ybUdyb3VwO1xuICBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gIGRpbW1lckluZGV4O1xuICBpc0RpbW1lZDtcbiAgZGltbWVyQ2xvc2VUZXh0ID0gdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi5jbG9zZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogU2xUcmFuc2xhdGVTZXJ2aWNlLHB1YmxpYyBxU2VydmljZTpTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBnZXQgcmVwb25zZVR5cGUoKTogdHlwZW9mIFJlc3BvbnNlVHlwZSB7XG4gICAgcmV0dXJuIFJlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIHRvZ2dsZVF1ZXN0aW9uKHBhcmVudCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHBhcmVudDtcblxuICAgIHRoaXMucXVlc3Rpb25zLm1hcCgocSwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkcmVuLmluY2x1ZGVzKHEuX2lkKSkge1xuICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLnF1ZXN0aW9uc1tpXTtcbiAgICAgICAgY2hpbGRbJ2NhbkRpc3BsYXknXSA9IHRoaXMuY2FuRGlzcGxheUNoaWxkUShjaGlsZCwgaSk7XG4gICAgICAgIGlmIChjaGlsZFsnY2FuRGlzcGxheSddID09IGZhbHNlKSB7XG4gICAgICAgICAgY2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLnJlbW92ZUNvbnRyb2woY2hpbGQuX2lkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FuRGlzcGxheUNoaWxkUShjdXJyZW50UXVlc3Rpb246IFF1ZXN0aW9uLCBjdXJyZW50UXVlc3Rpb25JbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGRpc3BsYXkgPSB0cnVlO1xuICAgIGlmICh0eXBlb2YgY3VycmVudFF1ZXN0aW9uLnZpc2libGVJZiA9PSAnc3RyaW5nJyB8fCBudWxsIHx8IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlOyAvL2lmIGNvbmRpdGlvbiBub3QgcHJlc2VudFxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHF1ZXN0aW9uIG9mIHRoaXMucXVlc3Rpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbmRpdGlvbiBvZiBjdXJyZW50UXVlc3Rpb24udmlzaWJsZUlmKSB7XG4gICAgICAgIGlmIChjb25kaXRpb24uX2lkID09PSBxdWVzdGlvbi5faWQpIHtcbiAgICAgICAgICBsZXQgZXhwcmVzc2lvbiA9IFtdO1xuICAgICAgICAgIGlmIChjb25kaXRpb24ub3BlcmF0b3IgIT0gJz09PScpIHtcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbi5yZXNwb25zZVR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJlbnRWYWx1ZSBvZiBxdWVzdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29uZGl0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICcoJyxcbiAgICAgICAgICAgICAgICAgICAgXCInXCIgKyBwYXJlbnRWYWx1ZSArIFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgICAnPT09JyxcbiAgICAgICAgICAgICAgICAgICAgXCInXCIgKyB2YWx1ZSArIFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgICAnKScsXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbi5vcGVyYXRvclxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29uZGl0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5wdXNoKFxuICAgICAgICAgICAgICAgICAgJygnLFxuICAgICAgICAgICAgICAgICAgXCInXCIgKyBxdWVzdGlvbi52YWx1ZSArIFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgJz09PScsXG4gICAgICAgICAgICAgICAgICBcIidcIiArIHZhbHVlICsgXCInXCIsXG4gICAgICAgICAgICAgICAgICAnKScsXG4gICAgICAgICAgICAgICAgICBjb25kaXRpb24ub3BlcmF0b3JcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHByZXNzaW9uLnBvcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocXVlc3Rpb24ucmVzcG9uc2VUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgcXVlc3Rpb24udmFsdWUpIHtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLnB1c2goXG4gICAgICAgICAgICAgICAgICAnKCcsXG4gICAgICAgICAgICAgICAgICBcIidcIiArIGNvbmRpdGlvbi52YWx1ZSArIFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgJz09PScsXG4gICAgICAgICAgICAgICAgICBcIidcIiArIHZhbHVlICsgXCInXCIsXG4gICAgICAgICAgICAgICAgICAnKScsXG4gICAgICAgICAgICAgICAgICAnfHwnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBleHByZXNzaW9uLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5wdXNoKFxuICAgICAgICAgICAgICAgICcoJyxcbiAgICAgICAgICAgICAgICBcIidcIiArIHF1ZXN0aW9uLnZhbHVlICsgXCInXCIsXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uLm9wZXJhdG9yLFxuICAgICAgICAgICAgICAgIFwiJ1wiICsgY29uZGl0aW9uLnZhbHVlICsgXCInXCIsXG4gICAgICAgICAgICAgICAgJyknXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZXZhbChleHByZXNzaW9uLmpvaW4oJycpKSkge1xuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNbY3VycmVudFF1ZXN0aW9uSW5kZXhdLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcy5xdWVzdGlvbnNbY3VycmVudFF1ZXN0aW9uSW5kZXhdLmlzQ29tcGxldGVkID1cbiAgICAgICAgICAgIC8vICAgdGhpcy51dGlscy5pc1F1ZXN0aW9uQ29tcGxldGUoY3VycmVudFF1ZXN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRpc3BsYXk7XG4gIH1cbn1cbiJdfQ==