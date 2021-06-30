import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
var DateInputComponent = /** @class */ (function () {
    function DateInputComponent(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    DateInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.autoCaptureText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.autoCapture;
        setTimeout(function () {
            _this.questionnaireForm.addControl(_this.question._id, new FormControl(_this.question.value ? new Date(_this.question.value) : null, [_this.qService.validate(_this.question)]));
            _this.question.startTime = _this.question.startTime
                ? _this.question.startTime
                : Date.now();
        });
        this.min = this.question.validation.min
            ? new Date(this.question.validation.min)
            : null;
        this.max = this.question.validation.max
            ? new Date(this.question.validation.max)
            : null;
    };
    DateInputComponent.prototype.onChange = function (e) {
        var value = e;
        this.question.value = value;
        this.question.endTime = Date.now();
    };
    DateInputComponent.prototype.autoCapture = function () {
        this.questionnaireForm.controls[this.question._id].patchValue(new Date(Date.now()));
    };
    DateInputComponent.ctorParameters = function () { return [
        { type: SlQuestionnaireService },
        { type: SlTranslateService }
    ]; };
    __decorate([
        Input()
    ], DateInputComponent.prototype, "questionnaireForm", void 0);
    __decorate([
        Input()
    ], DateInputComponent.prototype, "question", void 0);
    __decorate([
        Input()
    ], DateInputComponent.prototype, "autoCaptureText", void 0);
    DateInputComponent = __decorate([
        Component({
            selector: 'sl-date-input',
            template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n  class=\"d-flex flex-ai-center flex-jc-space-between\"\n>\n  <div class=\"ui left icon input\">\n    <i class=\"calendar icon\"></i>\n    <input\n      suiDatepicker\n      [pickerMode]=\"'date'\"\n      [pickerUseNativeOnMobile]=\"false\"\n      [formControlName]=\"question?._id\"\n      (pickerSelectedDateChange)=\"onChange($event)\"\n      class=\"question-date-input\"\n      [pickerMinDate]=\"min\"\n      [pickerMaxDate]=\"max\"\n    />\n  </div>\n  <div *ngIf=\"question?.autoCapture && !question?.value\">\n    <button class=\"sb-btn sb-btn-normal sb-btn-primary\" (click)=\"autoCapture()\">\n\t\t{{autoCaptureText}}\n    </button>\n  </div>\n</div>\n",
            styles: [""]
        })
    ], DateInputComponent);
    return DateInputComponent;
}());
export { DateInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL2RhdGUtaW5wdXQvZGF0ZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RTtJQVNFLDRCQUNVLFFBQWdDLEVBQ2hDLFNBQTZCO1FBRDdCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQW9CO0lBQ3BDLENBQUM7SUFFSixxQ0FBUSxHQUFSO1FBQUEsaUJBcUJDOztRQXBCQyxJQUFJLENBQUMsZUFBZSxTQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRywwQ0FBRSxXQUFXLENBQUM7UUFDcEUsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FDL0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQ2pCLElBQUksV0FBVyxDQUNiLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3BFLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ3hDLENBQ0YsQ0FBQztZQUVGLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztnQkFDL0MsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztnQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUF5QixDQUFDLEdBQUc7WUFDckQsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBeUIsQ0FBQyxHQUFHLENBQUM7WUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNULElBQUksQ0FBQyxHQUFHLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUF5QixDQUFDLEdBQUc7WUFDckQsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBeUIsQ0FBQyxHQUFHLENBQUM7WUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNYLENBQUM7SUFFRCxxQ0FBUSxHQUFSLFVBQVMsQ0FBUztRQUNoQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FDM0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQ3JCLENBQUM7SUFDSixDQUFDOztnQkFyQ21CLHNCQUFzQjtnQkFDckIsa0JBQWtCOztJQU45QjtRQUFSLEtBQUssRUFBRTtpRUFBOEI7SUFDN0I7UUFBUixLQUFLLEVBQUU7d0RBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFOytEQUF5QjtJQVB0QixrQkFBa0I7UUFMOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGVBQWU7WUFDekIsb3dCQUEwQzs7U0FFM0MsQ0FBQztPQUNXLGtCQUFrQixDQWdEOUI7SUFBRCx5QkFBQztDQUFBLEFBaERELElBZ0RDO1NBaERZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFF1ZXN0aW9uLCBWYWxpZGF0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9xdWVzdGlvbm5haXJlLnR5cGUnO1xuaW1wb3J0IHsgU2xUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2xRdWVzdGlvbm5haXJlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NsLXF1ZXN0aW9ubmFpcmUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NsLWRhdGUtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RhdGUtaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZGF0ZTogYW55O1xuICBtaW46IERhdGU7XG4gIG1heDogRGF0ZTtcblxuICBASW5wdXQoKSBxdWVzdGlvbm5haXJlRm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBxdWVzdGlvbjogUXVlc3Rpb247XG4gIEBJbnB1dCgpIGF1dG9DYXB0dXJlVGV4dDogU3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcVNlcnZpY2U6IFNsUXVlc3Rpb25uYWlyZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFNsVHJhbnNsYXRlU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hdXRvQ2FwdHVyZVRleHQgPSB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuPy5hdXRvQ2FwdHVyZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uYWRkQ29udHJvbChcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5faWQsXG4gICAgICAgIG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlID8gbmV3IERhdGUodGhpcy5xdWVzdGlvbi52YWx1ZSBhcyBzdHJpbmcpIDogbnVsbCxcbiAgICAgICAgICBbdGhpcy5xU2VydmljZS52YWxpZGF0ZSh0aGlzLnF1ZXN0aW9uKV1cbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5xdWVzdGlvbi5zdGFydFRpbWUgPSB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZVxuICAgICAgICA/IHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lXG4gICAgICAgIDogRGF0ZS5ub3coKTtcbiAgICB9KTtcbiAgICB0aGlzLm1pbiA9ICh0aGlzLnF1ZXN0aW9uLnZhbGlkYXRpb24gYXMgVmFsaWRhdGlvbikubWluXG4gICAgICA/IG5ldyBEYXRlKCh0aGlzLnF1ZXN0aW9uLnZhbGlkYXRpb24gYXMgVmFsaWRhdGlvbikubWluKVxuICAgICAgOiBudWxsO1xuICAgIHRoaXMubWF4ID0gKHRoaXMucXVlc3Rpb24udmFsaWRhdGlvbiBhcyBWYWxpZGF0aW9uKS5tYXhcbiAgICAgID8gbmV3IERhdGUoKHRoaXMucXVlc3Rpb24udmFsaWRhdGlvbiBhcyBWYWxpZGF0aW9uKS5tYXgpXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBvbkNoYW5nZShlOiBzdHJpbmcpIHtcbiAgICBsZXQgdmFsdWUgPSBlO1xuICAgIHRoaXMucXVlc3Rpb24udmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnF1ZXN0aW9uLmVuZFRpbWUgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgYXV0b0NhcHR1cmUoKSB7XG4gICAgdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0ucGF0Y2hWYWx1ZShcbiAgICAgIG5ldyBEYXRlKERhdGUubm93KCkpXG4gICAgKTtcbiAgfVxufVxuIl19