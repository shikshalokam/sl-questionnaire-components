import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
var NumberInputComponent = /** @class */ (function () {
    function NumberInputComponent(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    NumberInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a, _b;
        this.placeholder = (_b = (_a = this.translate['frmelmnts']) === null || _a === void 0 ? void 0 : _a.lbl) === null || _b === void 0 ? void 0 : _b.enterResponse;
        setTimeout(function () {
            _this.questionnaireForm.addControl(_this.question._id, new FormControl(_this.question.value || null, [
                _this.qService.validate(_this.question),
            ]));
            _this.question.startTime = _this.question.startTime
                ? _this.question.startTime
                : Date.now();
        });
    };
    NumberInputComponent.prototype.onChange = function (e) {
        var value = e.target.value;
        this.question.value = value;
        this.question.endTime = Date.now();
    };
    Object.defineProperty(NumberInputComponent.prototype, "isValid", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id].valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberInputComponent.prototype, "isTouched", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id].touched;
        },
        enumerable: true,
        configurable: true
    });
    NumberInputComponent.ctorParameters = function () { return [
        { type: SlQuestionnaireService },
        { type: SlTranslateService }
    ]; };
    __decorate([
        Input()
    ], NumberInputComponent.prototype, "questionnaireForm", void 0);
    __decorate([
        Input()
    ], NumberInputComponent.prototype, "question", void 0);
    NumberInputComponent = __decorate([
        Component({
            selector: 'sl-number-input',
            template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <input\n    type=\"number\"\n    [formControlName]=\"question?._id\"\n    class=\"sb-form-control\"\n    [placeholder]=\"placeholder\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
            styles: [""]
        })
    ], NumberInputComponent);
    return NumberInputComponent;
}());
export { NumberInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NsLXF1ZXN0aW9ubmFpcmUvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWlucHV0L251bWJlci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RTtJQUtFLDhCQUNVLFFBQWdDLEVBQ2hDLFNBQTZCO1FBRDdCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQW9CO0lBQ3BDLENBQUM7SUFFSix1Q0FBUSxHQUFSO1FBQUEsaUJBYUM7O1FBWkMsSUFBSSxDQUFDLFdBQVcsZUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxHQUFHLDBDQUFFLGFBQWEsQ0FBQztRQUNuRSxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUMvQixLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFDakIsSUFBSSxXQUFXLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUMzQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3RDLENBQUMsQ0FDSCxDQUFDO1lBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2dCQUMvQyxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2dCQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELHVDQUFRLEdBQVIsVUFBUyxDQUFRO1FBQ2YsSUFBSSxLQUFLLEdBQUksQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUU1QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELHNCQUFJLHlDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQ0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3BFLENBQUM7OztPQUFBOztnQkEvQm1CLHNCQUFzQjtnQkFDckIsa0JBQWtCOztJQUo5QjtRQUFSLEtBQUssRUFBRTttRUFBOEI7SUFDN0I7UUFBUixLQUFLLEVBQUU7MERBQW9CO0lBSmpCLG9CQUFvQjtRQUxoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLDRVQUE0Qzs7U0FFN0MsQ0FBQztPQUNXLG9CQUFvQixDQXNDaEM7SUFBRCwyQkFBQztDQUFBLEFBdENELElBc0NDO1NBdENZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9xdWVzdGlvbm5haXJlLnR5cGUnO1xuaW1wb3J0IHsgU2xUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2xRdWVzdGlvbm5haXJlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NsLXF1ZXN0aW9ubmFpcmUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NsLW51bWJlci1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9udW1iZXItaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9udW1iZXItaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVySW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwbGFjZWhvbGRlcjtcbiAgcmVzcG9uc2U6IHN0cmluZztcbiAgQElucHV0KCkgcXVlc3Rpb25uYWlyZUZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgcXVlc3Rpb246IFF1ZXN0aW9uO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHFTZXJ2aWNlOiBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBTbFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10/LmxibD8uZW50ZXJSZXNwb25zZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uYWRkQ29udHJvbChcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5faWQsXG4gICAgICAgIG5ldyBGb3JtQ29udHJvbCh0aGlzLnF1ZXN0aW9uLnZhbHVlIHx8IG51bGwsIFtcbiAgICAgICAgICB0aGlzLnFTZXJ2aWNlLnZhbGlkYXRlKHRoaXMucXVlc3Rpb24pLFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lID0gdGhpcy5xdWVzdGlvbi5zdGFydFRpbWVcbiAgICAgICAgPyB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZVxuICAgICAgICA6IERhdGUubm93KCk7XG4gICAgfSk7XG4gIH1cbiAgb25DaGFuZ2UoZTogRXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5xdWVzdGlvbi5lbmRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfVxuXG4gIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXS52YWxpZDtcbiAgfVxuXG4gIGdldCBpc1RvdWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdLnRvdWNoZWQ7XG4gIH1cbn1cbiJdfQ==