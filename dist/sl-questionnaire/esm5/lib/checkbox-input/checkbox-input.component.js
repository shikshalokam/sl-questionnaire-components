import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
var CheckboxInputComponent = /** @class */ (function () {
    function CheckboxInputComponent(qService, translate) {
        this.qService = qService;
        this.translate = translate;
        this.dependentParent = new EventEmitter();
    }
    CheckboxInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.hintCloseText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.close;
        setTimeout(function () {
            var optionControl = _this.options.map(function (v) {
                if (_this.question.value &&
                    _this.question.value.find(function (_v) { return _v == v.value; })) {
                    return new FormControl(v.value);
                }
                return new FormControl('');
            });
            _this.questionnaireForm.addControl(_this.question._id, new FormArray(optionControl, _this.qService.validate(_this.question)));
            _this.question.startTime = _this.question.startTime
                ? _this.question.startTime
                : Date.now();
            if (_this.question.value.length) {
                if (_this.question.children.length) {
                    _this.dependentParent.emit(_this.question);
                }
            }
        });
    };
    CheckboxInputComponent.prototype.onChange = function (oId, isChecked, oIndex) {
        var formArray = this.questionnaireForm.get(this.question._id);
        if (isChecked) {
            formArray.controls[oIndex].patchValue(oId);
        }
        this.question.value =
            this.questionnaireForm.controls[this.question._id].value;
        this.question.value = this.question.value.filter(Boolean);
        this.question.endTime = Date.now();
        if (this.question.children.length) {
            this.dependentParent.emit(this.question);
        }
    };
    Object.defineProperty(CheckboxInputComponent.prototype, "isValid", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id].valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxInputComponent.prototype, "isTouched", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id].touched;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxInputComponent.ctorParameters = function () { return [
        { type: SlQuestionnaireService },
        { type: SlTranslateService }
    ]; };
    __decorate([
        Input()
    ], CheckboxInputComponent.prototype, "options", void 0);
    __decorate([
        Input()
    ], CheckboxInputComponent.prototype, "questionnaireForm", void 0);
    __decorate([
        Input()
    ], CheckboxInputComponent.prototype, "question", void 0);
    __decorate([
        Output()
    ], CheckboxInputComponent.prototype, "dependentParent", void 0);
    CheckboxInputComponent = __decorate([
        Component({
            selector: 'sl-checkbox-input',
            template: "<div *ngIf=\"questionnaireForm?.contains(question._id)\">\n  <div\n    *ngFor=\"let o of options; let i = index\"\n    [formGroup]=\"questionnaireForm\"\n    class=\"mb-15 sb-checkbox sb-checkbox-secondary d-flex flex-ai-baseline\"\n  >\n    <div [formArrayName]=\"question._id\">\n      <sui-checkbox\n        (checkChange)=\"onChange(o.value, $event, i)\"\n        [formControlName]=\"i\"\n      >\n        {{ o.label }}\n      </sui-checkbox>\n    </div>\n    <div *ngIf=\"question?.option && question?.option[i]?.hint\">\n      <i\n        class=\"icon large lightbulb\"\n        (click)=\"isDimmed = !isDimmed; hint = question?.option[i]?.hint\"\n      ></i>\n    </div>\n  </div>\n</div>\n\n<sui-dimmer [(isDimmed)]=\"isDimmed\" [isClickable]=\"true\">\n  <h4 class=\"ui inverted header\">{{ hint }}</h4>\n  <button\n    type=\"button\"\n    class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n    type=\"submit\"\n  >\n    {{ hintCloseText }}\n  </button>\n</sui-dimmer>\n",
            styles: [""]
        })
    ], CheckboxInputComponent);
    return CheckboxInputComponent;
}());
export { CheckboxInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9jaGVja2JveC1pbnB1dC9jaGVja2JveC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RTtJQVFFLGdDQUNTLFFBQWdDLEVBQ2hDLFNBQTZCO1FBRDdCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBTDVCLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztJQU10RCxDQUFDO0lBRUoseUNBQVEsR0FBUjtRQUFBLGlCQTJCQzs7UUExQkMsSUFBSSxDQUFDLGFBQWEsU0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsMENBQUUsS0FBSyxDQUFDO1FBQzVELFVBQVUsQ0FBQztZQUNULElBQU0sYUFBYSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQztnQkFDdkMsSUFDRSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7b0JBQ2xCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBdUIsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBYixDQUFhLENBQUMsRUFDbEU7b0JBQ0EsT0FBTyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FB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cHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5pbXBvcnQgeyBTbFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmFuc2xhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2wtcXVlc3Rpb25uYWlyZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2wtY2hlY2tib3gtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3gtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaGVja2JveC1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgb3B0aW9ucztcbiAgQElucHV0KCkgcXVlc3Rpb25uYWlyZUZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgcXVlc3Rpb246IFF1ZXN0aW9uO1xuICBoaW50Q2xvc2VUZXh0OiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBkZXBlbmRlbnRQYXJlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPFF1ZXN0aW9uPigpO1xuICBpc0RpbW1lZDogYW55O1xuICBoaW50OiBhbnk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBxU2VydmljZTogU2xRdWVzdGlvbm5haXJlU2VydmljZSxcbiAgICBwdWJsaWMgdHJhbnNsYXRlOiBTbFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaGludENsb3NlVGV4dCA9IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4/LmNsb3NlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uQ29udHJvbCA9IHRoaXMub3B0aW9ucy5tYXAoKHYpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucXVlc3Rpb24udmFsdWUgJiZcbiAgICAgICAgICAodGhpcy5xdWVzdGlvbi52YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5maW5kKChfdikgPT4gX3YgPT0gdi52YWx1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBGb3JtQ29udHJvbCh2LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmFkZENvbnRyb2woXG4gICAgICAgIHRoaXMucXVlc3Rpb24uX2lkLFxuICAgICAgICBuZXcgRm9ybUFycmF5KG9wdGlvbkNvbnRyb2wsIHRoaXMucVNlcnZpY2UudmFsaWRhdGUodGhpcy5xdWVzdGlvbikpXG4gICAgICApO1xuXG4gICAgICB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZSA9IHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lXG4gICAgICAgID8gdGhpcy5xdWVzdGlvbi5zdGFydFRpbWVcbiAgICAgICAgOiBEYXRlLm5vdygpO1xuICAgICAgaWYgKHRoaXMucXVlc3Rpb24udmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuZGVwZW5kZW50UGFyZW50LmVtaXQodGhpcy5xdWVzdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2hhbmdlKG9JZDogc3RyaW5nLCBpc0NoZWNrZWQ6IGJvb2xlYW4sIG9JbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3QgZm9ybUFycmF5OiBGb3JtQXJyYXkgPSB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmdldChcbiAgICAgIHRoaXMucXVlc3Rpb24uX2lkXG4gICAgKSBhcyBGb3JtQXJyYXk7XG4gICAgaWYgKGlzQ2hlY2tlZCkge1xuICAgICAgZm9ybUFycmF5LmNvbnRyb2xzW29JbmRleF0ucGF0Y2hWYWx1ZShvSWQpO1xuICAgIH1cbiAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlID1cbiAgICAgIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdLnZhbHVlO1xuICAgIHRoaXMucXVlc3Rpb24udmFsdWUgPSAodGhpcy5xdWVzdGlvbi52YWx1ZSBhcyBBcnJheTxzdHJpbmc+KS5maWx0ZXIoXG4gICAgICBCb29sZWFuXG4gICAgKTtcbiAgICB0aGlzLnF1ZXN0aW9uLmVuZFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGlmICh0aGlzLnF1ZXN0aW9uLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgdGhpcy5kZXBlbmRlbnRQYXJlbnQuZW1pdCh0aGlzLnF1ZXN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0udmFsaWQ7XG4gIH1cblxuICBnZXQgaXNUb3VjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXS50b3VjaGVkO1xuICB9XG59XG4iXX0=