import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlTranslateService } from '../services/translate.service';
let QuesRemarksComponent = class QuesRemarksComponent {
    constructor(translate) {
        this.translate = translate;
        this.remark = '';
        this.saveClicked = new EventEmitter();
    }
    ngOnInit() {
        var _a;
        this.title = (_a = this.translate['frmelmnts'].lbl) === null || _a === void 0 ? void 0 : _a.remark_title;
        this.remarksAddText = this.translate['frmelmnts'].btn.add;
        this.remark = this.question.remarks;
        this.remark ? (this.showRemarks = true) : false;
    }
    saveRemark() {
        this.question.remarks = this.remark;
        this.saveClicked.emit({ value: this.remark });
    }
    deleteRemark() {
        this.remark = '';
        this.saveRemark();
        this.showRemarks = false;
    }
};
QuesRemarksComponent.ctorParameters = () => [
    { type: SlTranslateService }
];
__decorate([
    Output()
], QuesRemarksComponent.prototype, "saveClicked", void 0);
__decorate([
    Input()
], QuesRemarksComponent.prototype, "question", void 0);
QuesRemarksComponent = __decorate([
    Component({
        selector: 'sl-ques-remarks',
        template: "<div class=\"d-flex flex-ai-center flex-jc-space-between my-10\">\n  <h5 class=\"my-10\">{{ title }}</h5>\n  <button\n    class=\"sb-btn sb-btn-normal sb-btn-primary\"\n    *ngIf=\"!remark.length\"\n    (click)=\"showRemarks = true\"\n  >\n    {{ remarksAddText }}\n  </button>\n  <span *ngIf=\"remark.length\" (click)=\"deleteRemark()\"\n    ><i class=\"trash large icon\"></i\n  ></span>\n</div>\n\n<div class=\"d-flex flex-ai-end\" *ngIf=\"showRemarks\">\n  <textarea\n    rows=\"3\"\n    class=\"w-100\"\n    [(ngModel)]=\"remark\"\n    (ngModelChange)=\"saveRemark()\"\n  >\n  </textarea>\n</div>\n",
        styles: [""]
    })
], QuesRemarksComponent);
export { QuesRemarksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcy1yZW1hcmtzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NsLXF1ZXN0aW9ubmFpcmUvIiwic291cmNlcyI6WyJsaWIvcXVlcy1yZW1hcmtzL3F1ZXMtcmVtYXJrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFPbkUsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFRL0IsWUFBb0IsU0FBNkI7UUFBN0IsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFQakQsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdGLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUlTLENBQUM7SUFFckQsUUFBUTs7UUFDTixJQUFJLENBQUMsS0FBSyxTQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRywwQ0FBRSxZQUFZLENBQUM7UUFDM0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBQ0QsVUFBVTtRQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztDQUNGLENBQUE7O1lBbEJnQyxrQkFBa0I7O0FBSnZDO0lBQVQsTUFBTSxFQUFFO3lEQUFrQztBQUNsQztJQUFSLEtBQUssRUFBRTtzREFBb0I7QUFMakIsb0JBQW9CO0lBTGhDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsdW1CQUE0Qzs7S0FFN0MsQ0FBQztHQUNXLG9CQUFvQixDQTBCaEM7U0ExQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5pbXBvcnQgeyBTbFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90cmFuc2xhdGUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NsLXF1ZXMtcmVtYXJrcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9xdWVzLXJlbWFya3MuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9xdWVzLXJlbWFya3MuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc1JlbWFya3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICByZW1hcmsgPSAnJztcbiAgc2hvd1JlbWFya3M7XG5cbiAgQE91dHB1dCgpIHNhdmVDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBxdWVzdGlvbjogUXVlc3Rpb247XG4gIHRpdGxlOiBTdHJpbmc7XG4gIHJlbWFya3NBZGRUZXh0OiBTdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBTbFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5sYmw/LnJlbWFya190aXRsZTtcbiAgICB0aGlzLnJlbWFya3NBZGRUZXh0ID0gdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi5hZGQ7XG4gICAgdGhpcy5yZW1hcmsgPSB0aGlzLnF1ZXN0aW9uLnJlbWFya3M7XG4gICAgdGhpcy5yZW1hcmsgPyAodGhpcy5zaG93UmVtYXJrcyA9IHRydWUpIDogZmFsc2U7XG4gIH1cbiAgc2F2ZVJlbWFyaygpIHtcbiAgICB0aGlzLnF1ZXN0aW9uLnJlbWFya3MgPSB0aGlzLnJlbWFyaztcbiAgICB0aGlzLnNhdmVDbGlja2VkLmVtaXQoeyB2YWx1ZTogdGhpcy5yZW1hcmsgfSk7XG4gIH1cblxuICBkZWxldGVSZW1hcmsoKSB7XG4gICAgdGhpcy5yZW1hcmsgPSAnJztcbiAgICB0aGlzLnNhdmVSZW1hcmsoKTtcbiAgICB0aGlzLnNob3dSZW1hcmtzID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==