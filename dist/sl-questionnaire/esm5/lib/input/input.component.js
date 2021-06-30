import { __decorate, __values } from "tslib";
import { Component, Input } from '@angular/core';
import { ResponseType } from '../interfaces/questionnaire.type';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
var InputComponent = /** @class */ (function () {
    function InputComponent(translate, qService) {
        this.translate = translate;
        this.qService = qService;
        this.dimmerCloseText = this.translate['frmelmnts'].btn.close;
    }
    Object.defineProperty(InputComponent.prototype, "reponseType", {
        get: function () {
            return ResponseType;
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.toggleQuestion = function (parent) {
        var _this = this;
        var children = parent.children;
        this.questions.map(function (q, i) {
            if (children.includes(q._id)) {
                var child = _this.questions[i];
                child['canDisplay'] = _this.canDisplayChildQ(child, i);
                if (child['canDisplay'] == false) {
                    child.value = '';
                    _this.questionnaireForm.removeControl(child._id);
                }
            }
        });
    };
    InputComponent.prototype.canDisplayChildQ = function (currentQuestion, currentQuestionIndex) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f;
        var display = true;
        if (typeof currentQuestion.visibleIf == 'string' || null || undefined) {
            return false; //if condition not present
        }
        try {
            for (var _g = __values(this.questions), _h = _g.next(); !_h.done; _h = _g.next()) {
                var question = _h.value;
                try {
                    for (var _j = (e_2 = void 0, __values(currentQuestion.visibleIf)), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var condition = _k.value;
                        if (condition._id === question._id) {
                            var expression = [];
                            if (condition.operator != '===') {
                                if (question.responseType === 'multiselect') {
                                    try {
                                        for (var _l = (e_3 = void 0, __values(question.value)), _m = _l.next(); !_m.done; _m = _l.next()) {
                                            var parentValue = _m.value;
                                            try {
                                                for (var _o = (e_4 = void 0, __values(condition.value)), _p = _o.next(); !_p.done; _p = _o.next()) {
                                                    var value = _p.value;
                                                    expression.push('(', "'" + parentValue + "'", '===', "'" + value + "'", ')', condition.operator);
                                                }
                                            }
                                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                            finally {
                                                try {
                                                    if (_p && !_p.done && (_d = _o.return)) _d.call(_o);
                                                }
                                                finally { if (e_4) throw e_4.error; }
                                            }
                                        }
                                    }
                                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                    finally {
                                        try {
                                            if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
                                        }
                                        finally { if (e_3) throw e_3.error; }
                                    }
                                }
                                else {
                                    try {
                                        for (var _q = (e_5 = void 0, __values(condition.value)), _r = _q.next(); !_r.done; _r = _q.next()) {
                                            var value = _r.value;
                                            expression.push('(', "'" + question.value + "'", '===', "'" + value + "'", ')', condition.operator);
                                        }
                                    }
                                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                    finally {
                                        try {
                                            if (_r && !_r.done && (_e = _q.return)) _e.call(_q);
                                        }
                                        finally { if (e_5) throw e_5.error; }
                                    }
                                }
                                expression.pop();
                            }
                            else {
                                if (question.responseType === 'multiselect') {
                                    try {
                                        for (var _s = (e_6 = void 0, __values(question.value)), _t = _s.next(); !_t.done; _t = _s.next()) {
                                            var value = _t.value;
                                            expression.push('(', "'" + condition.value + "'", '===', "'" + value + "'", ')', '||');
                                        }
                                    }
                                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                    finally {
                                        try {
                                            if (_t && !_t.done && (_f = _s.return)) _f.call(_s);
                                        }
                                        finally { if (e_6) throw e_6.error; }
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
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return display;
    };
    InputComponent.ctorParameters = function () { return [
        { type: SlTranslateService },
        { type: SlQuestionnaireService }
    ]; };
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
    return InputComponent;
}());
export { InputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC9pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBWSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RTtJQVFFLHdCQUFvQixTQUE2QixFQUFRLFFBQStCO1FBQXBFLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBQVEsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUFGeEYsb0JBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFFbUMsQ0FBQztJQUU1RixzQkFBVyx1Q0FBVzthQUF0QjtZQUNFLE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsdUNBQWMsR0FBZCxVQUFlLE1BQU07UUFBckIsaUJBYUM7UUFaUyxJQUFBLDBCQUFRLENBQVk7UUFFNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUN0QixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFD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QUcsR0FBRyxFQUMzQixHQUFHLENBQ0osQ0FBQztpQ0FDSDs2QkFDRjs0QkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtnQ0FDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0NBQ3hELE9BQU8sS0FBSyxDQUFDOzZCQUNkO2lDQUFNO2dDQUNMLHFEQUFxRDtnQ0FDckQsb0RBQW9EOzZCQUNyRDt5QkFDRjtxQkFDRjs7Ozs7Ozs7O2FBQ0Y7Ozs7Ozs7OztRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQTNGOEIsa0JBQWtCO2dCQUFpQixzQkFBc0I7O0lBUC9FO1FBQVIsS0FBSyxFQUFFO3FEQUE0QjtJQUMzQjtRQUFSLEtBQUssRUFBRTs2REFBOEI7SUFGM0IsY0FBYztRQUwxQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQiw0K0hBQXFDOztTQUV0QyxDQUFDO09BQ1csY0FBYyxDQW9HMUI7SUFBRCxxQkFBQztDQUFBLEFBcEdELElBb0dDO1NBcEdZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFF1ZXN0aW9uLCBSZXNwb25zZVR5cGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5pbXBvcnQgeyBTbFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmFuc2xhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2wtcXVlc3Rpb25uYWlyZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2wtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbnB1dC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHF1ZXN0aW9uczogQXJyYXk8UXVlc3Rpb24+O1xuICBASW5wdXQoKSBxdWVzdGlvbm5haXJlRm9ybTogRm9ybUdyb3VwO1xuICBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gIGRpbW1lckluZGV4O1xuICBpc0RpbW1lZDtcbiAgZGltbWVyQ2xvc2VUZXh0ID0gdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi5jbG9zZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogU2xUcmFuc2xhdGVTZXJ2aWNlLHB1YmxpYyBxU2VydmljZTpTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBnZXQgcmVwb25zZVR5cGUoKTogdHlwZW9mIFJlc3BvbnNlVHlwZSB7XG4gICAgcmV0dXJuIFJlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIHRvZ2dsZVF1ZXN0aW9uKHBhcmVudCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHBhcmVudDtcblxuICAgIHRoaXMucXVlc3Rpb25zLm1hcCgocSwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkcmVuLmluY2x1ZGVzKHEuX2lkKSkge1xuICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLnF1ZXN0aW9uc1tpXTtcbiAgICAgICAgY2hpbGRbJ2NhbkRpc3BsYXknXSA9IHRoaXMuY2FuRGlzcGxheUNoaWxkUShjaGlsZCwgaSk7XG4gICAgICAgIGlmIChjaGlsZFsnY2FuRGlzcGxheSddID09IGZhbHNlKSB7XG4gICAgICAgICAgY2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLnJlbW92ZUNvbnRyb2woY2hpbGQuX2lkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FuRGlzcGxheUNoaWxkUShjdXJyZW50UXVlc3Rpb246IFF1ZXN0aW9uLCBjdXJyZW50UXVlc3Rpb25JbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGRpc3BsYXkgPSB0cnVlO1xuICAgIGlmICh0eXBlb2YgY3VycmVudFF1ZXN0aW9uLnZpc2libGVJZiA9PSAnc3RyaW5nJyB8fCBudWxsIHx8IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlOyAvL2lmIGNvbmRpdGlvbiBub3QgcHJlc2VudFxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHF1ZXN0aW9uIG9mIHRoaXMucXVlc3Rpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbmRpdGlvbiBvZiBjdXJyZW50UXVlc3Rpb24udmlzaWJsZUlmKSB7XG4gICAgICAgIGlmIChjb25kaXRpb24uX2lkID09PSBxdWVzdGlvbi5faWQpIHtcbiAgICAgICAgICBsZXQgZXhwcmVzc2lvbiA9IFtdO1xuICAgICAgICAgIGlmIChjb25kaXRpb24ub3BlcmF0b3IgIT0gJz09PScpIHtcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbi5yZXNwb25zZVR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJlbnRWYWx1ZSBvZiBxdWVzdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29uZGl0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICcoJyxcbiAgICAgICAgICAgICAgICAgICAgXCInXCIgKyBwYXJlbnRWYWx1ZSArIFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgICAnPT09JyxcbiAgICAgICAgICAgICAgICAgICAgXCInXCIgKyB2YWx1ZSArIFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgICAnKScsXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbi5vcGVyYXRvclxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgY29uZGl0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5wdXNoKFxuICAgICAgICAgICAgICAgICAgJygnLFxuICAgICAgICAgICAgICAgICAgXCInXCIgKyBxdWVzdGlvbi52YWx1ZSArIFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgJz09PScsXG4gICAgICAgICAgICAgICAgICBcIidcIiArIHZhbHVlICsgXCInXCIsXG4gICAgICAgICAgICAgICAgICAnKScsXG4gICAgICAgICAgICAgICAgICBjb25kaXRpb24ub3BlcmF0b3JcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHByZXNzaW9uLnBvcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocXVlc3Rpb24ucmVzcG9uc2VUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgcXVlc3Rpb24udmFsdWUpIHtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLnB1c2goXG4gICAgICAgICAgICAgICAgICAnKCcsXG4gICAgICAgICAgICAgICAgICBcIidcIiArIGNvbmRpdGlvbi52YWx1ZSArIFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgJz09PScsXG4gICAgICAgICAgICAgICAgICBcIidcIiArIHZhbHVlICsgXCInXCIsXG4gICAgICAgICAgICAgICAgICAnKScsXG4gICAgICAgICAgICAgICAgICAnfHwnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBleHByZXNzaW9uLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5wdXNoKFxuICAgICAgICAgICAgICAgICcoJyxcbiAgICAgICAgICAgICAgICBcIidcIiArIHF1ZXN0aW9uLnZhbHVlICsgXCInXCIsXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uLm9wZXJhdG9yLFxuICAgICAgICAgICAgICAgIFwiJ1wiICsgY29uZGl0aW9uLnZhbHVlICsgXCInXCIsXG4gICAgICAgICAgICAgICAgJyknXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZXZhbChleHByZXNzaW9uLmpvaW4oJycpKSkge1xuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNbY3VycmVudFF1ZXN0aW9uSW5kZXhdLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcy5xdWVzdGlvbnNbY3VycmVudFF1ZXN0aW9uSW5kZXhdLmlzQ29tcGxldGVkID1cbiAgICAgICAgICAgIC8vICAgdGhpcy51dGlscy5pc1F1ZXN0aW9uQ29tcGxldGUoY3VycmVudFF1ZXN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRpc3BsYXk7XG4gIH1cbn1cbiJdfQ==