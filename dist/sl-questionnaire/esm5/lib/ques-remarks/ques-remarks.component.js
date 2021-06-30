import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlTranslateService } from '../services/translate.service';
var QuesRemarksComponent = /** @class */ (function () {
    function QuesRemarksComponent(translate) {
        this.translate = translate;
        this.remark = '';
        this.saveClicked = new EventEmitter();
    }
    QuesRemarksComponent.prototype.ngOnInit = function () {
        var _a;
        this.title = (_a = this.translate['frmelmnts'].lbl) === null || _a === void 0 ? void 0 : _a.remark_title;
        this.remarksAddText = this.translate['frmelmnts'].btn.add;
        this.remark = this.question.remarks;
        this.remark ? (this.showRemarks = true) : false;
    };
    QuesRemarksComponent.prototype.saveRemark = function () {
        this.question.remarks = this.remark;
        this.saveClicked.emit({ value: this.remark });
    };
    QuesRemarksComponent.prototype.deleteRemark = function () {
        this.remark = '';
        this.saveRemark();
        this.showRemarks = false;
    };
    QuesRemarksComponent.ctorParameters = function () { return [
        { type: SlTranslateService }
    ]; };
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
    return QuesRemarksComponent;
}());
export { QuesRemarksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcy1yZW1hcmtzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NsLXF1ZXN0aW9ubmFpcmUvIiwic291cmNlcyI6WyJsaWIvcXVlcy1yZW1hcmtzL3F1ZXMtcmVtYXJrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFPbkU7SUFRRSw4QkFBb0IsU0FBNkI7UUFBN0IsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFQakQsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdGLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUlTLENBQUM7SUFFckQsdUNBQVEsR0FBUjs7UUFDRSxJQUFJLENBQUMsS0FBSyxTQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRywwQ0FBRSxZQUFZLENBQUM7UUFDM0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBQ0QseUNBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELDJDQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7Z0JBakI4QixrQkFBa0I7O0lBSnZDO1FBQVQsTUFBTSxFQUFFOzZEQUFrQztJQUNsQztRQUFSLEtBQUssRUFBRTswREFBb0I7SUFMakIsb0JBQW9CO1FBTGhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsdW1CQUE0Qzs7U0FFN0MsQ0FBQztPQUNXLG9CQUFvQixDQTBCaEM7SUFBRCwyQkFBQztDQUFBLEFBMUJELElBMEJDO1NBMUJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9xdWVzdGlvbm5haXJlLnR5cGUnO1xuaW1wb3J0IHsgU2xUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdHJhbnNsYXRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbC1xdWVzLXJlbWFya3MnLFxuICB0ZW1wbGF0ZVVybDogJy4vcXVlcy1yZW1hcmtzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcXVlcy1yZW1hcmtzLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXNSZW1hcmtzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcmVtYXJrID0gJyc7XG4gIHNob3dSZW1hcmtzO1xuXG4gIEBPdXRwdXQoKSBzYXZlQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgcXVlc3Rpb246IFF1ZXN0aW9uO1xuICB0aXRsZTogU3RyaW5nO1xuICByZW1hcmtzQWRkVGV4dDogU3RyaW5nO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogU2xUcmFuc2xhdGVTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10ubGJsPy5yZW1hcmtfdGl0bGU7XG4gICAgdGhpcy5yZW1hcmtzQWRkVGV4dCA9IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4uYWRkO1xuICAgIHRoaXMucmVtYXJrID0gdGhpcy5xdWVzdGlvbi5yZW1hcmtzO1xuICAgIHRoaXMucmVtYXJrID8gKHRoaXMuc2hvd1JlbWFya3MgPSB0cnVlKSA6IGZhbHNlO1xuICB9XG4gIHNhdmVSZW1hcmsoKSB7XG4gICAgdGhpcy5xdWVzdGlvbi5yZW1hcmtzID0gdGhpcy5yZW1hcms7XG4gICAgdGhpcy5zYXZlQ2xpY2tlZC5lbWl0KHsgdmFsdWU6IHRoaXMucmVtYXJrIH0pO1xuICB9XG5cbiAgZGVsZXRlUmVtYXJrKCkge1xuICAgIHRoaXMucmVtYXJrID0gJyc7XG4gICAgdGhpcy5zYXZlUmVtYXJrKCk7XG4gICAgdGhpcy5zaG93UmVtYXJrcyA9IGZhbHNlO1xuICB9XG59XG4iXX0=