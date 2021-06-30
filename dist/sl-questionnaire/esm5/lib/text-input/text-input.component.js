import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlTranslateService } from '../services/translate.service';
import { SlQuestionnaireService } from '../services/sl-questionnaire.service';
var TextInputComponent = /** @class */ (function () {
    function TextInputComponent(qService, translate) {
        this.qService = qService;
        this.translate = translate;
    }
    TextInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.placeholder = this.translate['frmelmnts'].lbl.enterResponse;
        setTimeout(function () {
            _this.questionnaireForm.addControl(_this.question._id, new FormControl(_this.question.value || null, [
                _this.qService.validate(_this.question),
            ]));
            _this.question.startTime = _this.question.startTime
                ? _this.question.startTime
                : Date.now();
        });
    };
    Object.defineProperty(TextInputComponent.prototype, "isValid", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id].valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputComponent.prototype, "isTouched", {
        get: function () {
            return this.questionnaireForm.controls[this.question._id].touched;
        },
        enumerable: true,
        configurable: true
    });
    TextInputComponent.prototype.onChange = function (e) {
        var value = e.target.value;
        this.question.value = value;
        this.question.endTime = Date.now();
    };
    TextInputComponent.ctorParameters = function () { return [
        { type: SlQuestionnaireService },
        { type: SlTranslateService }
    ]; };
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
    return TextInputComponent;
}());
export { TextInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL3RleHQtaW5wdXQvdGV4dC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU85RTtJQU1FLDRCQUNVLFFBQWdDLEVBQ2hDLFNBQTZCO1FBRDdCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQW9CO0lBQ3BDLENBQUM7SUFFSixxQ0FBUSxHQUFSO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUNqRSxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUMvQixLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFDakIsSUFBSSxXQUFXLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUMzQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3RDLENBQUMsQ0FDSCxDQUFDO1lBRUYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2dCQUMvQyxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2dCQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNCQUFJLHVDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx5Q0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3BFLENBQUM7OztPQUFBO0lBQ0QscUNBQVEsR0FBUixVQUFTLENBQVE7UUFDZixJQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxDQUFDOztnQkEvQm1CLHNCQUFzQjtnQkFDckIsa0JBQWtCOztJQU45QjtRQUFSLEtBQUssRUFBRTtpRUFBOEI7SUFDN0I7UUFBUixLQUFLLEVBQUU7d0RBQXFCO0lBSGxCLGtCQUFrQjtRQUw5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixnWkFBMEM7O1NBRTNDLENBQUM7T0FDVyxrQkFBa0IsQ0F1QzlCO0lBQUQseUJBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXZDWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvcXVlc3Rpb25uYWlyZS50eXBlJztcbmltcG9ydCB7IFNsVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNsUXVlc3Rpb25uYWlyZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zbC1xdWVzdGlvbm5haXJlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbC10ZXh0LWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHQtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90ZXh0LWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgcXVlc3Rpb25uYWlyZUZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgcXVlc3Rpb24gOiBRdWVzdGlvbjtcbiAgcGxhY2Vob2xkZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBxU2VydmljZTogU2xRdWVzdGlvbm5haXJlU2VydmljZSxcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogU2xUcmFuc2xhdGVTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmxibC5lbnRlclJlc3BvbnNlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5hZGRDb250cm9sKFxuICAgICAgICB0aGlzLnF1ZXN0aW9uLl9pZCxcbiAgICAgICAgbmV3IEZvcm1Db250cm9sKHRoaXMucXVlc3Rpb24udmFsdWUgfHwgbnVsbCwgW1xuICAgICAgICAgIHRoaXMucVNlcnZpY2UudmFsaWRhdGUodGhpcy5xdWVzdGlvbiksXG4gICAgICAgIF0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLnF1ZXN0aW9uLnN0YXJ0VGltZSA9IHRoaXMucXVlc3Rpb24uc3RhcnRUaW1lXG4gICAgICAgID8gdGhpcy5xdWVzdGlvbi5zdGFydFRpbWVcbiAgICAgICAgOiBEYXRlLm5vdygpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVlc3Rpb25uYWlyZUZvcm0uY29udHJvbHNbdGhpcy5xdWVzdGlvbi5faWRdLnZhbGlkO1xuICB9XG5cbiAgZ2V0IGlzVG91Y2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWVzdGlvbm5haXJlRm9ybS5jb250cm9sc1t0aGlzLnF1ZXN0aW9uLl9pZF0udG91Y2hlZDtcbiAgfVxuICBvbkNoYW5nZShlOiBFdmVudCkge1xuICAgIGxldCB2YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5xdWVzdGlvbi5lbmRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfVxufVxuIl19