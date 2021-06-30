import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
let NumberInputComponent = class NumberInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    ngOnInit() {
        var _a, _b;
        this.placeholder = (_b = (_a = this.translate['frmelmnts']) === null || _a === void 0 ? void 0 : _a.lbl) === null || _b === void 0 ? void 0 : _b.enterResponse;
        setTimeout(() => {
            this.questionnaireForm.addControl(this.question._id, new FormControl(this.question.value || null, [
                this.qService.validate(this.question),
            ]));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
        });
    }
    onChange(e) {
        let value = e.target.value;
        this.question.value = value;
        this.question.endTime = Date.now();
    }
    get isValid() {
        return this.questionnaireForm.controls[this.question._id].valid;
    }
    get isTouched() {
        return this.questionnaireForm.controls[this.question._id].touched;
    }
};
NumberInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
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
export { NumberInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NsLXF1ZXN0aW9ubmFpcmUvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWlucHV0L251bWJlci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RSxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUsvQixZQUNVLFFBQWdDLEVBQ2hDLFNBQTZCO1FBRDdCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQW9CO0lBQ3BDLENBQUM7SUFFSixRQUFROztRQUNOLElBQUksQ0FBQyxXQUFXLGVBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsMENBQUUsR0FBRywwQ0FBRSxhQUFhLENBQUM7UUFDbkUsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUNqQixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEMsQ0FBQyxDQUNILENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsUUFBUSxDQUFDLENBQVE7UUFDZixJQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRTVCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDcEUsQ0FBQztDQUNGLENBQUE7O1lBaENxQixzQkFBc0I7WUFDckIsa0JBQWtCOztBQUo5QjtJQUFSLEtBQUssRUFBRTsrREFBOEI7QUFDN0I7SUFBUixLQUFLLEVBQUU7c0RBQW9CO0FBSmpCLG9CQUFvQjtJQUxoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLDRVQUE0Qzs7S0FFN0MsQ0FBQztHQUNXLG9CQUFvQixDQXNDaEM7U0F0Q1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5pbXBvcnQgeyBTbFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmFuc2xhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2wtcXVlc3Rpb25uYWlyZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2wtbnVtYmVyLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL251bWJlci1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL251bWJlci1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHBsYWNlaG9sZGVyO1xuICByZXNwb25zZTogc3RyaW5nO1xuICBASW5wdXQoKSBxdWVzdGlvbm5haXJlRm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBxdWVzdGlvbjogUXVlc3Rpb247XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcVNlcnZpY2U6IFNsUXVlc3Rpb25uYWlyZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFNsVHJhbnNsYXRlU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXT8ubGJsPy5lbnRlclJlc3BvbnNlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5hZGRDb250cm9sKFxuICAgICAgICB0aGlzLnF1ZXN0aW9uLl9pZCxcbiAgICAgICAgbmV3IEZvcm1Db250cm9sKHRoaXMucXVlc3Rpb24udmFsdWUgfHwgbnVsbCwgW1xuICAgICAgICAgIHRoaXMucVNlcnZpY2UudmFsaWRhdGUodGhpcy5xdWVzdGlvbiksXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgdGhpcy5xdWVzdGlvbi5zdGFydFRpbWUgPSB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZVxuICAgICAgICA/IHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lXG4gICAgICAgIDogRGF0ZS5ub3coKTtcbiAgICB9KTtcbiAgfVxuICBvbkNoYW5nZShlOiBFdmVudCkge1xuICAgIGxldCB2YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLnF1ZXN0aW9uLmVuZFRpbWUgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdLnZhbGlkO1xuICB9XG5cbiAgZ2V0IGlzVG91Y2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0udG91Y2hlZDtcbiAgfVxufVxuIl19