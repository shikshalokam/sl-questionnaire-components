import { __decorate } from "tslib";
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
var RadioInputComponent = /** @class */ (function () {
    function RadioInputComponent(qService, translate) {
        this.qService = qService;
        this.translate = translate;
        this.dependentParent = new EventEmitter();
    }
    RadioInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.hintCloseText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.close;
        setTimeout(function () {
            _this.questionnaireForm.addControl(_this.question._id, new FormControl(_this.question.value || null, _this.qService.validate(_this.question)));
            _this.question.startTime = _this.question.startTime
                ? _this.question.startTime
                : Date.now();
            if (_this.question.value) {
                if (_this.question.children.length) {
                    _this.dependentParent.emit(_this.question);
                }
            }
        });
    };
    Object.defineProperty(RadioInputComponent.prototype, "isValid", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id].valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioInputComponent.prototype, "isTouched", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id].touched;
        },
        enumerable: true,
        configurable: true
    });
    RadioInputComponent.prototype.onChange = function (value) {
        this.questionnaireForm.controls[this.question._id].setValue(value);
        this.question.value = value;
        this.question.endTime = Date.now();
        if (this.question.children.length) {
            this.dependentParent.emit(this.question);
        }
    };
    RadioInputComponent.ctorParameters = function () { return [
        { type: SlQuestionnaireService },
        { type: SlTranslateService }
    ]; };
    __decorate([
        Input()
    ], RadioInputComponent.prototype, "options", void 0);
    __decorate([
        Input()
    ], RadioInputComponent.prototype, "questionnaireForm", void 0);
    __decorate([
        Input()
    ], RadioInputComponent.prototype, "question", void 0);
    __decorate([
        Output()
    ], RadioInputComponent.prototype, "dependentParent", void 0);
    RadioInputComponent = __decorate([
        Component({
            selector: 'sl-radio-input',
            template: "<div *ngIf=\"questionnaireForm?.contains(question._id)\">\n  <div\n    *ngFor=\"let o of options; let optionIndex = index\"\n    [formGroup]=\"questionnaireForm\"\n    class=\"\n      mb-15\n      sb-radio-btn-checkbox sb-radio-btn-primary\n      d-flex\n      flex-ai-baseline\n    \"\n  >\n    <input\n      type=\"radio\"\n      (change)=\"onChange(o.value)\"\n      [name]=\"question._id\"\n      [ngClass]=\"isValid && isTouched ? 'is-invalid' : 'is-valid'\"\n      [value]=\"o.value\"\n      [formControlName]=\"question._id\"\n    />\n    <label>{{ o.label }}</label>\n    <div *ngIf=\"question?.option && question?.option[optionIndex]?.hint\">\n      <i\n        class=\"icon large lightbulb\"\n        (click)=\"\n          isDimmed = !isDimmed; hint = question?.option[optionIndex]?.hint\n        \"\n      ></i>\n    </div>\n  </div>\n</div>\n\n<sui-dimmer [(isDimmed)]=\"isDimmed\" [isClickable]=\"true\">\n  <h4 class=\"ui inverted header\">{{ hint }}</h4>\n  <button\n    type=\"button\"\n    class=\"sb-btn sb-btn-sm sb-btn-white text-uppercase flex-basis-1\"\n    type=\"submit\"\n  >\n    {{ hintCloseText}}\n  </button>\n</sui-dimmer>\n",
            styles: [""]
        })
    ], RadioInputComponent);
    return RadioInputComponent;
}());
export { RadioInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8taW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9yYWRpby1pbnB1dC9yYWRpby1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQWEsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFPOUU7SUFTRSw2QkFDUyxRQUFnQyxFQUNoQyxTQUE2QjtRQUQ3QixhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUNoQyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQU41QixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7SUFPdEQsQ0FBQztJQUVKLHNDQUFRLEdBQVI7UUFBQSxpQkFvQkM7O1FBbkJDLElBQUksQ0FBQyxhQUFhLFNBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLDBDQUFFLEtBQUssQ0FBQztRQUM1RCxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUMvQixLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFDakIsSUFBSSxXQUFXLENBQ2IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQ3RDLENBQ0YsQ0FBQztZQUVGLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztnQkFDL0MsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztnQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUNqQyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzFDO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBSSx3Q0FBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2xFLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMENBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNwRSxDQUFDOzs7T0FBQTtJQUVELHNDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1osSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7O2dCQXpDa0Isc0JBQXNCO2dCQUNyQixrQkFBa0I7O0lBVjdCO1FBQVIsS0FBSyxFQUFFO3dEQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7a0VBQThCO0lBQzdCO1FBQVIsS0FBSyxFQUFFO3lEQUFvQjtJQUVsQjtRQUFULE1BQU0sRUFBRTtnRUFBZ0Q7SUFMOUMsbUJBQW1CO1FBTC9CLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsOG9DQUEyQzs7U0FFNUMsQ0FBQztPQUNXLG1CQUFtQixDQW9EL0I7SUFBRCwwQkFBQztDQUFBLEFBcERELElBb0RDO1NBcERZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvcXVlc3Rpb25uYWlyZS50eXBlJztcbmltcG9ydCB7IFNsVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNsUXVlc3Rpb25uYWlyZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zbC1xdWVzdGlvbm5haXJlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbC1yYWRpby1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yYWRpby1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JhZGlvLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG4gIEBJbnB1dCgpIHF1ZXN0aW9ubmFpcmVGb3JtOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIHF1ZXN0aW9uOiBRdWVzdGlvbjtcbiAgaGludENsb3NlVGV4dDogc3RyaW5nO1xuICBAT3V0cHV0KCkgZGVwZW5kZW50UGFyZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxRdWVzdGlvbj4oKTtcbiAgaXNEaW1tZWQ6IGFueTtcbiAgaGludDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBxU2VydmljZTogU2xRdWVzdGlvbm5haXJlU2VydmljZSxcbiAgICBwdWJsaWMgdHJhbnNsYXRlOiBTbFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaGludENsb3NlVGV4dCA9IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4/LmNsb3NlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5hZGRDb250cm9sKFxuICAgICAgICB0aGlzLnF1ZXN0aW9uLl9pZCxcbiAgICAgICAgbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgIHRoaXMucXVlc3Rpb24udmFsdWUgfHwgbnVsbCxcbiAgICAgICAgICB0aGlzLnFTZXJ2aWNlLnZhbGlkYXRlKHRoaXMucXVlc3Rpb24pXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lID0gdGhpcy5xdWVzdGlvbi5zdGFydFRpbWVcbiAgICAgICAgPyB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZVxuICAgICAgICA6IERhdGUubm93KCk7XG4gICAgICBpZiAodGhpcy5xdWVzdGlvbi52YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5xdWVzdGlvbi5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmRlcGVuZGVudFBhcmVudC5lbWl0KHRoaXMucXVlc3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0udmFsaWQ7XG4gIH1cblxuICBnZXQgaXNUb3VjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXS50b3VjaGVkO1xuICB9XG5cbiAgb25DaGFuZ2UodmFsdWUpIHtcbiAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucXVlc3Rpb24uZW5kVGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKHRoaXMucXVlc3Rpb24uY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRlcGVuZGVudFBhcmVudC5lbWl0KHRoaXMucXVlc3Rpb24pO1xuICAgIH1cbiAgfVxufVxuIl19