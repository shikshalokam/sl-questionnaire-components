import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
let DateInputComponent = class DateInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    ngOnInit() {
        var _a;
        this.autoCaptureText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.autoCapture;
        setTimeout(() => {
            this.questionnaireForm.addControl(this.question._id, new FormControl(this.question.value ? new Date(this.question.value) : null, [this.qService.validate(this.question)]));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
        });
        this.min = this.question.validation.min
            ? new Date(this.question.validation.min)
            : null;
        this.max = this.question.validation.max
            ? new Date(this.question.validation.max)
            : null;
    }
    onChange(e) {
        let value = e;
        this.question.value = value;
        this.question.endTime = Date.now();
    }
    autoCapture() {
        this.questionnaireForm.controls[this.question._id].patchValue(new Date(Date.now()));
    }
};
DateInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
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
export { DateInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL2RhdGUtaW5wdXQvZGF0ZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQVM3QixZQUNVLFFBQWdDLEVBQ2hDLFNBQTZCO1FBRDdCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQW9CO0lBQ3BDLENBQUM7SUFFSixRQUFROztRQUNOLElBQUksQ0FBQyxlQUFlLFNBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLDBDQUFFLFdBQVcsQ0FBQztRQUNwRSxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQ2pCLElBQUksV0FBVyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3BFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ3hDLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztnQkFDL0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztnQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUF5QixDQUFDLEdBQUc7WUFDckQsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBeUIsQ0FBQyxHQUFHLENBQUM7WUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNULElBQUksQ0FBQyxHQUFHLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUF5QixDQUFDLEdBQUc7WUFDckQsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBeUIsQ0FBQyxHQUFHLENBQUM7WUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNYLENBQUM7SUFFRCxRQUFRLENBQUMsQ0FBUztRQUNoQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FDM0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQ3JCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUF0Q3FCLHNCQUFzQjtZQUNyQixrQkFBa0I7O0FBTjlCO0lBQVIsS0FBSyxFQUFFOzZEQUE4QjtBQUM3QjtJQUFSLEtBQUssRUFBRTtvREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7MkRBQXlCO0FBUHRCLGtCQUFrQjtJQUw5QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6Qixvd0JBQTBDOztLQUUzQyxDQUFDO0dBQ1csa0JBQWtCLENBZ0Q5QjtTQWhEWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWVzdGlvbiwgVmFsaWRhdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvcXVlc3Rpb25uYWlyZS50eXBlJztcbmltcG9ydCB7IFNsVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNsUXVlc3Rpb25uYWlyZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zbC1xdWVzdGlvbm5haXJlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbC1kYXRlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIERhdGVJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGRhdGU6IGFueTtcbiAgbWluOiBEYXRlO1xuICBtYXg6IERhdGU7XG5cbiAgQElucHV0KCkgcXVlc3Rpb25uYWlyZUZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgcXVlc3Rpb246IFF1ZXN0aW9uO1xuICBASW5wdXQoKSBhdXRvQ2FwdHVyZVRleHQ6IFN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHFTZXJ2aWNlOiBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBTbFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXV0b0NhcHR1cmVUZXh0ID0gdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bj8uYXV0b0NhcHR1cmU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmFkZENvbnRyb2woXG4gICAgICAgIHRoaXMucXVlc3Rpb24uX2lkLFxuICAgICAgICBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA/IG5ldyBEYXRlKHRoaXMucXVlc3Rpb24udmFsdWUgYXMgc3RyaW5nKSA6IG51bGwsXG4gICAgICAgICAgW3RoaXMucVNlcnZpY2UudmFsaWRhdGUodGhpcy5xdWVzdGlvbildXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lID0gdGhpcy5xdWVzdGlvbi5zdGFydFRpbWVcbiAgICAgICAgPyB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZVxuICAgICAgICA6IERhdGUubm93KCk7XG4gICAgfSk7XG4gICAgdGhpcy5taW4gPSAodGhpcy5xdWVzdGlvbi52YWxpZGF0aW9uIGFzIFZhbGlkYXRpb24pLm1pblxuICAgICAgPyBuZXcgRGF0ZSgodGhpcy5xdWVzdGlvbi52YWxpZGF0aW9uIGFzIFZhbGlkYXRpb24pLm1pbilcbiAgICAgIDogbnVsbDtcbiAgICB0aGlzLm1heCA9ICh0aGlzLnF1ZXN0aW9uLnZhbGlkYXRpb24gYXMgVmFsaWRhdGlvbikubWF4XG4gICAgICA/IG5ldyBEYXRlKCh0aGlzLnF1ZXN0aW9uLnZhbGlkYXRpb24gYXMgVmFsaWRhdGlvbikubWF4KVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgb25DaGFuZ2UoZTogc3RyaW5nKSB7XG4gICAgbGV0IHZhbHVlID0gZTtcbiAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5xdWVzdGlvbi5lbmRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfVxuXG4gIGF1dG9DYXB0dXJlKCkge1xuICAgIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdLnBhdGNoVmFsdWUoXG4gICAgICBuZXcgRGF0ZShEYXRlLm5vdygpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==