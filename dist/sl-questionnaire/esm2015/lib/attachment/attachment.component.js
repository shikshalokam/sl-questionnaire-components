import { __awaiter, __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { SlTranslateService } from '../services/translate.service';
import { SlUtilsService } from '../services/utils.service';
let AttachmentComponent = class AttachmentComponent {
    constructor(translate, utils) {
        this.translate = translate;
        this.utils = utils;
    }
    ngOnInit() { }
    basicUpload(files) {
        let sizeMB = +(files[0].size / 1000 / 1000).toFixed(4);
        if (sizeMB > 20) {
            this.fileLimitCross();
            return;
        }
        this.formData = new FormData();
        Array.from(files).forEach((f) => this.formData.append('file', f));
        this.preSignedUrl(this.getFileNames(this.formData));
    }
    fileLimitCross() {
        const alertMeta = {
            size: 'tiny',
            bodyType: 'text',
            data: this.translate['frmelmnts'].alert.fileLimitCross20,
            buttonClass: 'single-btn',
            acceptText: this.translate['frmelmnts'].btn.ok,
            cancelText: null,
        };
        this.utils.alert(alertMeta);
    }
    getFileNames(formData) {
        let files = [];
        formData.forEach((element) => {
            files.push(element.name);
        });
        return files;
    }
    preSignedUrl(files) {
        let payload = {};
        payload['ref'] = 'survey';
        payload['request'] = {};
        payload['request'][this.data.submissionId] = {
            files: files,
        };
        this.utils.getPreSingedUrls(payload).subscribe((imageData) => {
            const presignedUrlData = imageData['result'][this.data.submissionId].files[0];
            this.formData.append('url', presignedUrlData.url);
            this.utils.cloudStorageUpload(this.formData).subscribe((success) => {
                if (success.status === 200) {
                    const obj = {
                        name: this.getFileNames(this.formData)[0],
                        url: presignedUrlData.url.split('?')[0],
                    };
                    for (const key of Object.keys(presignedUrlData.payload)) {
                        obj[key] = presignedUrlData['payload'][key];
                    }
                    this.data.files.push(obj);
                    const alertMeta = {
                        size: 'tiny',
                        bodyType: 'text',
                        data: this.translate['frmelmnts'].alert.evidenceUploaded,
                        buttonClass: 'single-btn',
                        acceptText: this.translate['frmelmnts'].btn.ok,
                        cancelText: null,
                        type: 'uploaded',
                    };
                    this.utils.alert(alertMeta);
                }
                else {
                    this.utils.error(this.translate['frmelmnts'].message.unableToUpload);
                }
            }, (error) => {
                this.utils.error(this.translate['frmelmnts'].message.unableToUpload);
            });
        }, (error) => {
            console.log(error);
        });
    }
    extension(name) {
        return name.split('.').pop();
    }
    openFile(file) {
        window.open(file.url, '_blank');
    }
    deleteAttachment(fileIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const alertMeta = {
                size: 'mini',
                bodyType: 'text',
                data: this.translate['frmelmnts'].alert.confirmEvidenceDelete,
                buttonClass: 'double-btn',
                acceptText: this.translate['frmelmnts'].btn.ok,
                cancelText: this.translate['frmelmnts'].btn.no,
            };
            const accepted = yield this.utils.alert(alertMeta);
            if (!accepted) {
                return;
            }
            this.data.files.splice(fileIndex, 1);
        });
    }
    onAddApproval(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = `
    ${this.translate['frmelmnts'].alert.evidence_content_policy}<a href='/term-of-use.html' target="_blank">${this.translate['frmelmnts'].alert.evidence_content_policy_label}</a> .${this.translate['frmelmnts'].alert.uploadevidencecontent}
    `;
            const alertMeta = {
                size: 'tiny',
                bodyType: 'checkbox',
                data: html,
                buttonClass: 'double-btn',
                acceptText: this.translate['frmelmnts'].btn.upload,
                cancelText: this.translate['frmelmnts'].btn.donotupload,
            };
            let returnData = yield this.utils.alert(alertMeta);
            if (!returnData) {
                this.notAccepted();
                return;
            }
            file.click();
        });
    }
    notAccepted() {
        const alertMeta = {
            size: 'tiny',
            bodyType: 'text',
            data: this.translate['frmelmnts'].alert.uploadTermsRejected,
            buttonClass: 'single-btn',
            acceptText: this.translate['frmelmnts'].btn.ok,
            cancelText: null,
            type: 'notAccepted',
        };
        this.utils.alert(alertMeta);
    }
};
AttachmentComponent.ctorParameters = () => [
    { type: SlTranslateService },
    { type: SlUtilsService }
];
__decorate([
    Input()
], AttachmentComponent.prototype, "data", void 0);
AttachmentComponent = __decorate([
    Component({
        selector: 'sl-attachment',
        template: "<label for=\"file-upload\" class=\"custom-file-upload\"></label>\n<input\n  id=\"file-upload\"\n  type=\"file\"\n  #file\n  (change)=\"basicUpload($event.target.files)\"\n/>\n<div class=\"d-flex\">\n  <div class=\"bs-1 p-20\" (click)=\"onAddApproval(file)\">\n    <i class=\"plus icon\"></i>\n  </div>\n  <div\n    *ngFor=\"let item of data.files; let i = index\"\n    (click)=\"openFile(item)\"\n    class=\"area\"\n  >\n    <a\n      class=\"remove-image\"\n      (click)=\"$event.stopPropagation(); deleteAttachment(i)\"\n      >&#215;</a\n    >\n    <div *ngIf=\"extension(item.name) == 'png'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'jpg'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'jpeg'\" class=\"mx-10\">\n      <i class=\"file image outline icon\"></i>\n    </div>\n    <div *ngIf=\"extension(item.name) == 'pdf'\" class=\"mx-10\">\n      <i class=\"file pdf outline icon\"></i>\n    </div>\n  </div>\n</div>\n",
        styles: ["input[type=file]{display:none}.area{position:relative}.area a{display:inline}.area i{font-size:40px}.remove-image{display:none;position:absolute;top:-10px;right:2px;border-radius:10em;padding:2px 6px 3px;text-decoration:none;background:#555;border:3px solid #fff;color:#fff!important;box-shadow:0 2px 6px rgba(0,0,0,.5),inset 0 2px 4px rgba(0,0,0,.3);text-shadow:0 1px 2px rgba(0,0,0,.5);transition:background .5s}.remove-image:hover{background:#e54e4e;padding:3px 7px 5px;top:-11px;right:2px}.remove-image:active{background:#e54e4e;top:-10px;right:2px}.bs-1{background-color:grey}"]
    })
], AttachmentComponent);
export { AttachmentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL2F0dGFjaG1lbnQvYXR0YWNobWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU8zRCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUc5QixZQUNVLFNBQTZCLEVBQzdCLEtBQXFCO1FBRHJCLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBQzdCLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQzVCLENBQUM7SUFFSixRQUFRLEtBQVUsQ0FBQztJQUVuQixXQUFXLENBQUMsS0FBYTtRQUN2QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMs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QUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7S0FBQTtJQUVELFdBQVc7UUFDVCxNQUFNLFNBQVMsR0FBYztZQUMzQixJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUI7WUFDM0QsV0FBVyxFQUFFLFlBQVk7WUFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUMsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLGFBQWE7U0FDcEIsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDRixDQUFBOztZQWpKc0Isa0JBQWtCO1lBQ3RCLGNBQWM7O0FBSnRCO0lBQVIsS0FBSyxFQUFFO2lEQUFNO0FBREgsbUJBQW1CO0lBTC9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLG1rQ0FBMEM7O0tBRTNDLENBQUM7R0FDVyxtQkFBbUIsQ0FxSi9CO1NBckpZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRNZXRhIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hbGVydC50eXBlJztcbmltcG9ydCB7IFNsVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RyYW5zbGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNsVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NsLWF0dGFjaG1lbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vYXR0YWNobWVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F0dGFjaG1lbnQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQXR0YWNobWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGE7XG4gIGZvcm1EYXRhO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogU2xUcmFuc2xhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgdXRpbHM6IFNsVXRpbHNTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgYmFzaWNVcGxvYWQoZmlsZXM6IEZpbGVbXSkge1xuICAgIGxldCBzaXplTUIgPSArKGZpbGVzWzBdLnNpemUgLyAxMDAwIC8gMTAwMCkudG9GaXhlZCg0KTtcbiAgICBpZiAoc2l6ZU1CID4gMjApIHtcbiAgICAgIHRoaXMuZmlsZUxpbWl0Q3Jvc3MoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5mb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIEFycmF5LmZyb20oZmlsZXMpLmZvckVhY2goKGYpID0+IHRoaXMuZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZikpO1xuICAgIHRoaXMucHJlU2lnbmVkVXJsKHRoaXMuZ2V0RmlsZU5hbWVzKHRoaXMuZm9ybURhdGEpKTtcbiAgfVxuXG4gIGZpbGVMaW1pdENyb3NzKCkge1xuICAgIGNvbnN0IGFsZXJ0TWV0YTogQWxlcnRNZXRhID0ge1xuICAgICAgc2l6ZTogJ3RpbnknLFxuICAgICAgYm9keVR5cGU6ICd0ZXh0JyxcbiAgICAgIGRhdGE6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5hbGVydC5maWxlTGltaXRDcm9zczIwLFxuICAgICAgYnV0dG9uQ2xhc3M6ICdzaW5nbGUtYnRuJyxcbiAgICAgIGFjY2VwdFRleHQ6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4ub2ssXG4gICAgICBjYW5jZWxUZXh0OiBudWxsLFxuICAgIH07XG4gICAgdGhpcy51dGlscy5hbGVydChhbGVydE1ldGEpO1xuICB9XG5cbiAgZ2V0RmlsZU5hbWVzKGZvcm1EYXRhKSB7XG4gICAgbGV0IGZpbGVzID0gW107XG4gICAgZm9ybURhdGEuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZmlsZXMucHVzaChlbGVtZW50Lm5hbWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmaWxlcztcbiAgfVxuXG4gIHByZVNpZ25lZFVybChmaWxlcykge1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgcGF5bG9hZFsncmVmJ10gPSAnc3VydmV5JztcbiAgICBwYXlsb2FkWydyZXF1ZXN0J10gPSB7fTtcbiAgICBwYXlsb2FkWydyZXF1ZXN0J11bdGhpcy5kYXRhLnN1Ym1pc3Npb25JZF0gPSB7XG4gICAgICBmaWxlczogZmlsZXMsXG4gICAgfTtcbiAgICB0aGlzLnV0aWxzLmdldFByZVNpbmdlZFVybHMocGF5bG9hZCkuc3Vic2NyaWJlKFxuICAgICAgKGltYWdlRGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBwcmVzaWduZWRVcmxEYXRhID1cbiAgICAgICAgICBpbWFnZURhdGFbJ3Jlc3VsdCddW3RoaXMuZGF0YS5zdWJtaXNzaW9uSWRdLmZpbGVzWzBdO1xuICAgICAgICB0aGlzLmZvcm1EYXRhLmFwcGVuZCgndXJsJywgcHJlc2lnbmVkVXJsRGF0YS51cmwpO1xuICAgICAgICB0aGlzLnV0aWxzLmNsb3VkU3RvcmFnZVVwbG9hZCh0aGlzLmZvcm1EYXRhKS5zdWJzY3JpYmUoXG4gICAgICAgICAgKHN1Y2Nlc3M6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN1Y2Nlc3Muc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZ2V0RmlsZU5hbWVzKHRoaXMuZm9ybURhdGEpWzBdLFxuICAgICAgICAgICAgICAgIHVybDogcHJlc2lnbmVkVXJsRGF0YS51cmwuc3BsaXQoJz8nKVswXSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocHJlc2lnbmVkVXJsRGF0YS5wYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gcHJlc2lnbmVkVXJsRGF0YVsncGF5bG9hZCddW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5kYXRhLmZpbGVzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgY29uc3QgYWxlcnRNZXRhOiBBbGVydE1ldGEgPSB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ3RpbnknLFxuICAgICAgICAgICAgICAgIGJvZHlUeXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmFsZXJ0LmV2aWRlbmNlVXBsb2FkZWQsXG4gICAgICAgICAgICAgICAgYnV0dG9uQ2xhc3M6ICdzaW5nbGUtYnRuJyxcbiAgICAgICAgICAgICAgICBhY2NlcHRUZXh0OiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuLm9rLFxuICAgICAgICAgICAgICAgIGNhbmNlbFRleHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3VwbG9hZGVkJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgdGhpcy51dGlscy5hbGVydChhbGVydE1ldGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy51dGlscy5lcnJvcihcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10ubWVzc2FnZS51bmFibGVUb1VwbG9hZFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnV0aWxzLmVycm9yKFxuICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10ubWVzc2FnZS51bmFibGVUb1VwbG9hZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZXh0ZW5zaW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuICB9XG4gIG9wZW5GaWxlKGZpbGUpIHtcbiAgICB3aW5kb3cub3BlbihmaWxlLnVybCwgJ19ibGFuaycpO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlQXR0YWNobWVudChmaWxlSW5kZXgpIHtcbiAgICBjb25zdCBhbGVydE1ldGE6IEFsZXJ0TWV0YSA9IHtcbiAgICAgIHNpemU6ICdtaW5pJyxcbiAgICAgIGJvZHlUeXBlOiAndGV4dCcsXG4gICAgICBkYXRhOiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYWxlcnQuY29uZmlybUV2aWRlbmNlRGVsZXRlLFxuICAgICAgYnV0dG9uQ2xhc3M6ICdkb3VibGUtYnRuJyxcbiAgICAgIGFjY2VwdFRleHQ6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4ub2ssXG4gICAgICBjYW5jZWxUZXh0OiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuLm5vLFxuICAgIH07XG4gICAgY29uc3QgYWNjZXB0ZWQgPSBhd2FpdCB0aGlzLnV0aWxzLmFsZXJ0KGFsZXJ0TWV0YSk7XG5cbiAgICBpZiAoIWFjY2VwdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGF0YS5maWxlcy5zcGxpY2UoZmlsZUluZGV4LCAxKTtcbiAgfVxuXG4gIGFzeW5jIG9uQWRkQXBwcm92YWwoZmlsZSkge1xuICAgIGxldCBodG1sID0gYFxuICAgICR7dGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmFsZXJ0LmV2aWRlbmNlX2NvbnRlbnRfcG9saWN5fTxhIGhyZWY9Jy90ZXJtLW9mLXVzZS5odG1sJyB0YXJnZXQ9XCJfYmxhbmtcIj4ke3RoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5hbGVydC5ldmlkZW5jZV9jb250ZW50X3BvbGljeV9sYWJlbH08L2E+IC4ke3RoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5hbGVydC51cGxvYWRldmlkZW5jZWNvbnRlbnR9XG4gICAgYDtcbiAgICBjb25zdCBhbGVydE1ldGE6IEFsZXJ0TWV0YSA9IHtcbiAgICAgIHNpemU6ICd0aW55JyxcbiAgICAgIGJvZHlUeXBlOiAnY2hlY2tib3gnLFxuICAgICAgZGF0YTogaHRtbCxcbiAgICAgIGJ1dHRvbkNsYXNzOiAnZG91YmxlLWJ0bicsXG4gICAgICBhY2NlcHRUZXh0OiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuLnVwbG9hZCxcbiAgICAgIGNhbmNlbFRleHQ6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4uZG9ub3R1cGxvYWQsXG4gICAgfTtcbiAgICBsZXQgcmV0dXJuRGF0YSA9IGF3YWl0IHRoaXMudXRpbHMuYWxlcnQoYWxlcnRNZXRhKTtcbiAgICBpZiAoIXJldHVybkRhdGEpIHtcbiAgICAgIHRoaXMubm90QWNjZXB0ZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZmlsZS5jbGljaygpO1xuICB9XG5cbiAgbm90QWNjZXB0ZWQoKTogdm9pZCB7XG4gICAgY29uc3QgYWxlcnRNZXRhOiBBbGVydE1ldGEgPSB7XG4gICAgICBzaXplOiAndGlueScsXG4gICAgICBib2R5VHlwZTogJ3RleHQnLFxuICAgICAgZGF0YTogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmFsZXJ0LnVwbG9hZFRlcm1zUmVqZWN0ZWQsXG4gICAgICBidXR0b25DbGFzczogJ3NpbmdsZS1idG4nLFxuICAgICAgYWNjZXB0VGV4dDogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi5vayxcbiAgICAgIGNhbmNlbFRleHQ6IG51bGwsXG4gICAgICB0eXBlOiAnbm90QWNjZXB0ZWQnLFxuICAgIH07XG4gICAgdGhpcy51dGlscy5hbGVydChhbGVydE1ldGEpO1xuICB9XG59XG4iXX0=