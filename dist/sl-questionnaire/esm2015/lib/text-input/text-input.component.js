import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
let TextInputComponent = class TextInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    ngOnInit() {
        this.placeholder = this.translate['frmelmnts'].lbl.enterResponse;
        setTimeout(() => {
            this.questionnaireForm.addControl(this.question._id, new FormControl(this.question.value || null, [
                this.qService.validate(this.question),
            ]));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
        });
    }
    get isValid() {
        return this.questionnaireForm.controls[this.question._id].valid;
    }
    get isTouched() {
        return this.questionnaireForm.controls[this.question._id].touched;
    }
    onChange(e) {
        let value = e.target.value;
        this.question.value = value;
        this.question.endTime = Date.now();
    }
};
TextInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
__decorate([
    Input()
], TextInputComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], TextInputComponent.prototype, "question", void 0);
TextInputComponent = __decorate([
    Component({
        selector: 'sl-text-input',
        template: "<div\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <input\n    type=\"text\"\n    [formControlName]=\"question?._id\"\n    [ngClass]=\"!isValid && isTouched ? 'is-invalid ' : 'is-valid'\"\n    class=\"sb-form-control\"\n    [placeholder]=\"placeholder\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
        styles: [""]
    })
], TextInputComponent);
export { TextInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL3RleHQtaW5wdXQvdGV4dC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQU03QixZQUNVLFFBQWdDLEVBQ2hDLFNBQTZCO1FBRDdCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQW9CO0lBQ3BDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDakUsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUNqQixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEMsQ0FBQyxDQUNILENBQUM7WUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDcEUsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFRO1FBQ2YsSUFBSSxLQUFLLEdBQUksQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckMsQ0FBQztDQUNGLENBQUE7O1lBaENxQixzQkFBc0I7WUFDckIsa0JBQWtCOztBQU45QjtJQUFSLEtBQUssRUFBRTs2REFBOEI7QUFDN0I7SUFBUixLQUFLLEVBQUU7b0RBQXFCO0FBSGxCLGtCQUFrQjtJQUw5QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixnWkFBMEM7O0tBRTNDLENBQUM7R0FDVyxrQkFBa0IsQ0F1QzlCO1NBdkNZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9xdWVzdGlvbm5haXJlLnR5cGUnO1xuaW1wb3J0IHsgU2xUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2xRdWVzdGlvbm5haXJlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NsLXF1ZXN0aW9ubmFpcmUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NsLXRleHQtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGV4dC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RleHQtaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBxdWVzdGlvbm5haXJlRm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBxdWVzdGlvbiA6IFF1ZXN0aW9uO1xuICBwbGFjZWhvbGRlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHFTZXJ2aWNlOiBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBTbFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10ubGJsLmVudGVyUmVzcG9uc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmFkZENvbnRyb2woXG4gICAgICAgIHRoaXMucXVlc3Rpb24uX2lkLFxuICAgICAgICBuZXcgRm9ybUNvbnRyb2wodGhpcy5xdWVzdGlvbi52YWx1ZSB8fCBudWxsLCBbXG4gICAgICAgICAgdGhpcy5xU2VydmljZS52YWxpZGF0ZSh0aGlzLnF1ZXN0aW9uKSxcbiAgICAgICAgXSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lID0gdGhpcy5xdWVzdGlvbi5zdGFydFRpbWVcbiAgICAgICAgPyB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZVxuICAgICAgICA6IERhdGUubm93KCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0udmFsaWQ7XG4gIH1cblxuICBnZXQgaXNUb3VjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXS50b3VjaGVkO1xuICB9XG4gIG9uQ2hhbmdlKGU6IEV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgIHRoaXMucXVlc3Rpb24udmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnF1ZXN0aW9uLmVuZFRpbWUgPSBEYXRlLm5vdygpO1xuICB9XG59XG4iXX0=