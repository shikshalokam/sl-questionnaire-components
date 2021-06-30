import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
let RangeInputComponent = class RangeInputComponent {
    constructor(qService) {
        this.qService = qService;
    }
    ngOnInit() {
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
    get min() {
        if (typeof this.question.validation == 'string') {
            return null;
        }
        return this.question.validation.min;
    }
    get max() {
        if (typeof this.question.validation == 'string') {
            return null;
        }
        return this.question.validation.max;
    }
};
RangeInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService }
];
__decorate([
    Input()
], RangeInputComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], RangeInputComponent.prototype, "question", void 0);
RangeInputComponent = __decorate([
    Component({
        selector: 'sl-range-input',
        template: "<div\n  class=\"\n    d-flex\n    flex-ai-center flex-dc\n    mt-30\n    ng-dirty ng-invalid ng-touched\n    range-wrap\n  \"\n  [formGroup]=\"questionnaireForm\"\n  *ngIf=\"questionnaireForm?.contains(question._id)\"\n>\n  <div class=\"range-value\" id=\"rangeV\">{{ this.question.value }}</div>\n\n  <input\n    id=\"range\"\n    type=\"range\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [ngClass]=\"isValid && isTouched ? 'is-invalid' : 'is-valid'\"\n    step=\"1\"\n    [formControlName]=\"question?._id\"\n    class=\"w-100\"\n    (change)=\"onChange($event)\"\n    [value]=\"question.value\"\n  />\n</div>\n",
        styles: [".range-value{width:50px;height:50px;line-height:50px;border-radius:50%;font-size:20px;color:#0274fd;text-align:center;background:#e9e8d9;margin-bottom:17px}input[type=range]{height:34px;-webkit-appearance:none;margin:10px 0;width:100%}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:11px;cursor:pointer;animate:.2s;box-shadow:1px 1px 1px #000;background:#74a9d8;border-radius:1px;border:0 solid #010101}input[type=range]::-webkit-slider-thumb{box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer;-webkit-appearance:none;margin-top:-8px}input[type=range]:focus::-webkit-slider-runnable-track{background:#74a9d8}input[type=range]::-moz-range-track{width:100%;height:11px;cursor:pointer;animate:.2s;box-shadow:1px 1px 1px #000;background:#74a9d8;border-radius:1px;border:0 solid #010101}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer}input[type=range]::-ms-track{width:100%;height:11px;cursor:pointer;animate:.2s;background:0 0;border-color:transparent;color:transparent}input[type=range]::-ms-fill-lower{background:#74a9d8;border:0 solid #010101;border-radius:2px;box-shadow:1px 1px 1px #000}input[type=range]::-ms-fill-upper{background:#74a9d8;border:0 solid #010101;border-radius:2px;box-shadow:1px 1px 1px #000}input[type=range]::-ms-thumb{margin-top:1px;box-shadow:1px 1px 1px #000031;border:1px solid #00001e;height:26px;width:26px;border-radius:15px;background:#fff;cursor:pointer}input[type=range]:focus::-ms-fill-lower{background:#74a9d8}input[type=range]:focus::-ms-fill-upper{background:#74a9d8}"]
    })
], RangeInputComponent);
export { RangeInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9yYW5nZS1pbnB1dC9yYW5nZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBYSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUc5QixZQUFtQixRQUFnQztRQUFoQyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtJQUFHLENBQUM7SUFFdkQsUUFBUTtRQUNOLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFDakIsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3RDLENBQUMsQ0FDSCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2dCQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2dCQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFRO1FBQ2YsSUFBSSxLQUFLLEdBQUksQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRSxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxFQUFFO1lBQy9DLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsRUFBRTtZQUMvQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDdEMsQ0FBQztDQUNGLENBQUE7O1lBM0M4QixzQkFBc0I7O0FBRjFDO0lBQVIsS0FBSyxFQUFFOzhEQUE4QjtBQUM3QjtJQUFSLEtBQUssRUFBRTtxREFBb0I7QUFGakIsbUJBQW1CO0lBTC9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsaW5CQUEyQzs7S0FFNUMsQ0FBQztHQUNXLG1CQUFtQixDQThDL0I7U0E5Q1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5pbXBvcnQgeyBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2wtcXVlc3Rpb25uYWlyZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2wtcmFuZ2UtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmFuZ2UtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yYW5nZS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBSYW5nZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcXVlc3Rpb25uYWlyZUZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgcXVlc3Rpb246IFF1ZXN0aW9uO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcVNlcnZpY2U6IFNsUXVlc3Rpb25uYWlyZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmFkZENvbnRyb2woXG4gICAgICAgIHRoaXMucXVlc3Rpb24uX2lkLFxuICAgICAgICBuZXcgRm9ybUNvbnRyb2wodGhpcy5xdWVzdGlvbi52YWx1ZSB8fCBudWxsLCBbXG4gICAgICAgICAgdGhpcy5xU2VydmljZS52YWxpZGF0ZSh0aGlzLnF1ZXN0aW9uKSxcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZSA9IHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lXG4gICAgICAgID8gdGhpcy5xdWVzdGlvbi5zdGFydFRpbWVcbiAgICAgICAgOiBEYXRlLm5vdygpO1xuICAgIH0pO1xuICB9XG5cbiAgb25DaGFuZ2UoZTogRXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucXVlc3Rpb24uZW5kVGltZSA9IERhdGUubm93KCk7XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0udmFsaWQ7XG4gIH1cblxuICBnZXQgaXNUb3VjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXS50b3VjaGVkO1xuICB9XG5cbiAgZ2V0IG1pbigpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucXVlc3Rpb24udmFsaWRhdGlvbiA9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9uLnZhbGlkYXRpb24ubWluO1xuICB9XG5cbiAgZ2V0IG1heCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucXVlc3Rpb24udmFsaWRhdGlvbiA9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9uLnZhbGlkYXRpb24ubWF4O1xuICB9XG59XG4iXX0=