import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
let CheckboxInputComponent = class CheckboxInputComponent {
    constructor(qService, translate) {
        this.qService = qService;
        this.translate = translate;
        this.dependentParent = new EventEmitter();
    }
    ngOnInit() {
        var _a;
        this.hintCloseText = (_a = this.translate['frmelmnts'].btn) === null || _a === void 0 ? void 0 : _a.close;
        setTimeout(() => {
            const optionControl = this.options.map((v) => {
                if (this.question.value &&
                    this.question.value.find((_v) => _v == v.value)) {
                    return new FormControl(v.value);
                }
                return new FormControl('');
            });
            this.questionnaireForm.addControl(this.question._id, new FormArray(optionControl, this.qService.validate(this.question)));
            this.question.startTime = this.question.startTime
                ? this.question.startTime
                : Date.now();
            if (this.question.value.length) {
                if (this.question.children.length) {
                    this.dependentParent.emit(this.question);
                }
            }
        });
    }
    onChange(oId, isChecked, oIndex) {
        const formArray = this.questionnaireForm.get(this.question._id);
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
    }
    get isValid() {
        return this.questionnaireForm.controls[this.question._id].valid;
    }
    get isTouched() {
        return this.questionnaireForm.controls[this.question._id].touched;
    }
};
CheckboxInputComponent.ctorParameters = () => [
    { type: SlQuestionnaireService },
    { type: SlTranslateService }
];
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
export { CheckboxInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9jaGVja2JveC1pbnB1dC9jaGVja2JveC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQVFqQyxZQUNTLFFBQWdDLEVBQ2hDLFNBQTZCO1FBRDdCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBTDVCLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztJQU10RCxDQUFDO0lBRUosUUFBUTs7UUFDTixJQUFJLENBQUMsYUFBYSxTQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRywwQ0FBRSxLQUFLLENBQUM7UUFDNUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLElBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO29CQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUNsRTtvQkFDQSxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7Z0JBQ0QsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUNqQixJQUFJLFNBQVMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ3BFLENBQUM7WUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDMUM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXLEVBQUUsU0FBa0IsRUFBRSxNQUFjO1FBQ3RELE1BQU0sU0FBUyxHQUFjLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNMLENBQUM7UUFDZixJQUFJLFNBQVMsRUFBRTtZQUNiLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUF1QixDQUFDLE1BQU0sQ0FDakUsT0FBTyxDQUNSLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRSxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3BFLENBQUM7Q0FDRixDQUFBOztZQTFEb0Isc0JBQXNCO1lBQ3JCLGtCQUFrQjs7QUFUN0I7SUFBUixLQUFLLEVBQUU7dURBQVM7QUFDUjtJQUFSLEtBQUssRUFBRTtpRUFBOEI7QUFDN0I7SUFBUixLQUFLLEVBQUU7d0RBQW9CO0FBRWxCO0lBQVQsTUFBTSxFQUFFOytEQUFnRDtBQUw5QyxzQkFBc0I7SUFMbEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixnL0JBQThDOztLQUUvQyxDQUFDO0dBQ1csc0JBQXNCLENBbUVsQztTQW5FWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvcXVlc3Rpb25uYWlyZS50eXBlJztcbmltcG9ydCB7IFNsVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNsUXVlc3Rpb25uYWlyZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zbC1xdWVzdGlvbm5haXJlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbC1jaGVja2JveC1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja2JveC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NoZWNrYm94LWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBvcHRpb25zO1xuICBASW5wdXQoKSBxdWVzdGlvbm5haXJlRm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBxdWVzdGlvbjogUXVlc3Rpb247XG4gIGhpbnRDbG9zZVRleHQ6IHN0cmluZztcbiAgQE91dHB1dCgpIGRlcGVuZGVudFBhcmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8UXVlc3Rpb24+KCk7XG4gIGlzRGltbWVkOiBhbnk7XG4gIGhpbnQ6IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHFTZXJ2aWNlOiBTbFF1ZXN0aW9ubmFpcmVTZXJ2aWNlLFxuICAgIHB1YmxpYyB0cmFuc2xhdGU6IFNsVHJhbnNsYXRlU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5oaW50Q2xvc2VUZXh0ID0gdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bj8uY2xvc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25Db250cm9sID0gdGhpcy5vcHRpb25zLm1hcCgodikgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5xdWVzdGlvbi52YWx1ZSAmJlxuICAgICAgICAgICh0aGlzLnF1ZXN0aW9uLnZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmZpbmQoKF92KSA9PiBfdiA9PSB2LnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEZvcm1Db250cm9sKHYudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uYWRkQ29udHJvbChcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5faWQsXG4gICAgICAgIG5ldyBGb3JtQXJyYXkob3B0aW9uQ29udHJvbCwgdGhpcy5xU2VydmljZS52YWxpZGF0ZSh0aGlzLnF1ZXN0aW9uKSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lID0gdGhpcy5xdWVzdGlvbi5zdGFydFRpbWVcbiAgICAgICAgPyB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZVxuICAgICAgICA6IERhdGUubm93KCk7XG4gICAgICBpZiAodGhpcy5xdWVzdGlvbi52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMucXVlc3Rpb24uY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5kZXBlbmRlbnRQYXJlbnQuZW1pdCh0aGlzLnF1ZXN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25DaGFuZ2Uob0lkOiBzdHJpbmcsIGlzQ2hlY2tlZDogYm9vbGVhbiwgb0luZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBmb3JtQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uZ2V0KFxuICAgICAgdGhpcy5xdWVzdGlvbi5faWRcbiAgICApIGFzIEZvcm1BcnJheTtcbiAgICBpZiAoaXNDaGVja2VkKSB7XG4gICAgICBmb3JtQXJyYXkuY29udHJvbHNbb0luZGV4XS5wYXRjaFZhbHVlKG9JZCk7XG4gICAgfVxuICAgIHRoaXMucXVlc3Rpb24udmFsdWUgPVxuICAgICAgdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0udmFsdWU7XG4gICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9ICh0aGlzLnF1ZXN0aW9uLnZhbHVlIGFzIEFycmF5PHN0cmluZz4pLmZpbHRlcihcbiAgICAgIEJvb2xlYW5cbiAgICApO1xuICAgIHRoaXMucXVlc3Rpb24uZW5kVGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKHRoaXMucXVlc3Rpb24uY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICB0aGlzLmRlcGVuZGVudFBhcmVudC5lbWl0KHRoaXMucXVlc3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXN0aW9ubmFpcmVGb3JtLmNvbnRyb2xzW3RoaXMucXVlc3Rpb24uX2lkXS52YWxpZDtcbiAgfVxuXG4gIGdldCBpc1RvdWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdLnRvdWNoZWQ7XG4gIH1cbn1cbiJdfQ==