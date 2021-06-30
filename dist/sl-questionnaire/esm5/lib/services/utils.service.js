import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuiModalService } from 'ng2-semantic-ui-v9';
import * as i0 from "@angular/core";
import * as i1 from "ng2-semantic-ui-v9";
var SlUtilsService = /** @class */ (function () {
    function SlUtilsService(modalService) {
        this.modalService = modalService;
    }
    /**
     * @param {AlertMeta}  meta: Alert Meta Form Object
     * @param {String} meta.title Optional ! Display title of alert fields
     * @param {String}  meta.size Provide size of alert.('tiny','mini)
     * @param {AlertBodyType}  meta.bodyType Alert-content type to show in alert body
     * @param {String}  meta.data content to show
     * @param {String}  meta.buttonClass class to apply on button div
     * @param {String}  meta.acceptText text to show in accept button
     * @param {String}  meta.cancelText text to show in accept button
     * @param {String}  meta.type Optional ! To set type of alert
     * @param {Boolean}  meta.closeIcon Optional ! Show top right close icon , default = false
     */
    SlUtilsService.prototype.alert = function (meta) {
        var button = [];
        meta.acceptText &&
            button.push({
                type: 'accept',
                returnValue: true,
                buttonText: meta.acceptText,
            });
        meta.cancelText &&
            button.push({
                type: 'cancel',
                returnValue: false,
                buttonText: meta.cancelText,
            });
        var alertMeta = {
            type: meta.type,
            size: meta.size,
            isClosed: meta.closeIcon,
            content: {
                title: meta.title,
                body: {
                    type: meta.bodyType,
                    data: meta.data,
                },
            },
            footer: {
                className: meta.buttonClass,
                buttons: button,
            },
        };
        return this.openAlert(alertMeta);
    };
    SlUtilsService.ctorParameters = function () { return [
        { type: SuiModalService }
    ]; };
    SlUtilsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SlUtilsService_Factory() { return new SlUtilsService(i0.ɵɵinject(i1.SuiModalService)); }, token: SlUtilsService, providedIn: "root" });
    SlUtilsService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], SlUtilsService);
    return SlUtilsService;
}());
export { SlUtilsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NsLXF1ZXN0aW9ubmFpcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQU1yRDtJQUNFLHdCQUFtQixZQUE2QjtRQUE3QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7SUFBRyxDQUFDO0lBRXBEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsOEJBQUssR0FBTCxVQUFNLElBQWU7UUFDbkIsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsSUFBSTtnQkFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQzVCLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxVQUFVO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQzVCLENBQUMsQ0FBQztRQUVMLElBQUksU0FBUyxHQUFHO1lBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3hCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDaEI7YUFDRjtZQUNELE1BQU0sRUFBRTtnQkFDTixTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzNCLE9BQU8sRUFBRSxNQUFNO2FBQ2hCO1NBQ0YsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDOztnQkEvQ2dDLGVBQWU7OztJQUQ1QixjQUFjO1FBSG5DLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDb0IsY0FBYyxDQXlEbkM7eUJBaEVEO0NBZ0VDLEFBekRELElBeURDO1NBekRxQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3VpTW9kYWxTZXJ2aWNlIH0gZnJvbSAnbmcyLXNlbWFudGljLXVpLXY5JztcbmltcG9ydCB7IEFsZXJ0TWV0YSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYWxlcnQudHlwZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTbFV0aWxzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2RhbFNlcnZpY2U6IFN1aU1vZGFsU2VydmljZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtBbGVydE1ldGF9ICBtZXRhOiBBbGVydCBNZXRhIEZvcm0gT2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRhLnRpdGxlIE9wdGlvbmFsICEgRGlzcGxheSB0aXRsZSBvZiBhbGVydCBmaWVsZHNcbiAgICogQHBhcmFtIHtTdHJpbmd9ICBtZXRhLnNpemUgUHJvdmlkZSBzaXplIG9mIGFsZXJ0LigndGlueScsJ21pbmkpXG4gICAqIEBwYXJhbSB7QWxlcnRCb2R5VHlwZX0gIG1ldGEuYm9keVR5cGUgQWxlcnQtY29udGVudCB0eXBlIHRvIHNob3cgaW4gYWxlcnQgYm9keVxuICAgKiBAcGFyYW0ge1N0cmluZ30gIG1ldGEuZGF0YSBjb250ZW50IHRvIHNob3dcbiAgICogQHBhcmFtIHtTdHJpbmd9ICBtZXRhLmJ1dHRvbkNsYXNzIGNsYXNzIHRvIGFwcGx5IG9uIGJ1dHRvbiBkaXZcbiAgICogQHBhcmFtIHtTdHJpbmd9ICBtZXRhLmFjY2VwdFRleHQgdGV4dCB0byBzaG93IGluIGFjY2VwdCBidXR0b25cbiAgICogQHBhcmFtIHtTdHJpbmd9ICBtZXRhLmNhbmNlbFRleHQgdGV4dCB0byBzaG93IGluIGFjY2VwdCBidXR0b25cbiAgICogQHBhcmFtIHtTdHJpbmd9ICBtZXRhLnR5cGUgT3B0aW9uYWwgISBUbyBzZXQgdHlwZSBvZiBhbGVydFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59ICBtZXRhLmNsb3NlSWNvbiBPcHRpb25hbCAhIFNob3cgdG9wIHJpZ2h0IGNsb3NlIGljb24gLCBkZWZhdWx0ID0gZmFsc2VcbiAgICovXG4gIGFsZXJ0KG1ldGE6IEFsZXJ0TWV0YSkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IFtdO1xuICAgIG1ldGEuYWNjZXB0VGV4dCAmJlxuICAgICAgYnV0dG9uLnB1c2goe1xuICAgICAgICB0eXBlOiAnYWNjZXB0JyxcbiAgICAgICAgcmV0dXJuVmFsdWU6IHRydWUsXG4gICAgICAgIGJ1dHRvblRleHQ6IG1ldGEuYWNjZXB0VGV4dCxcbiAgICAgIH0pO1xuICAgIG1ldGEuY2FuY2VsVGV4dCAmJlxuICAgICAgYnV0dG9uLnB1c2goe1xuICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgcmV0dXJuVmFsdWU6IGZhbHNlLFxuICAgICAgICBidXR0b25UZXh0OiBtZXRhLmNhbmNlbFRleHQsXG4gICAgICB9KTtcblxuICAgIGxldCBhbGVydE1ldGEgPSB7XG4gICAgICB0eXBlOiBtZXRhLnR5cGUsXG4gICAgICBzaXplOiBtZXRhLnNpemUsXG4gICAgICBpc0Nsb3NlZDogbWV0YS5jbG9zZUljb24sXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgIHRpdGxlOiBtZXRhLnRpdGxlLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgdHlwZTogbWV0YS5ib2R5VHlwZSxcbiAgICAgICAgICBkYXRhOiBtZXRhLmRhdGEsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZm9vdGVyOiB7XG4gICAgICAgIGNsYXNzTmFtZTogbWV0YS5idXR0b25DbGFzcyxcbiAgICAgICAgYnV0dG9uczogYnV0dG9uLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMub3BlbkFsZXJ0KGFsZXJ0TWV0YSk7XG4gIH1cblxuICBhYnN0cmFjdCBvcGVuQWxlcnQoZGF0YSk6IFByb21pc2U8YW55PjtcblxuICBhYnN0cmFjdCBlcnJvcihtc2cpO1xuXG4gIGFic3RyYWN0IGdldFByZVNpbmdlZFVybHMocGF5bG9hZCk7XG5cbiAgYWJzdHJhY3QgY2xvdWRTdG9yYWdlVXBsb2FkKHBheWxvYWQpO1xufVxuIl19