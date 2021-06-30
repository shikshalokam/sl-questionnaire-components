import { __awaiter, __decorate, __generator, __values } from "tslib";
import { Component, Input } from '@angular/core';
import { SlTranslateService } from '../services/translate.service';
import { SlUtilsService } from '../services/utils.service';
var AttachmentComponent = /** @class */ (function () {
    function AttachmentComponent(translate, utils) {
        this.translate = translate;
        this.utils = utils;
    }
    AttachmentComponent.prototype.ngOnInit = function () { };
    AttachmentComponent.prototype.basicUpload = function (files) {
        var _this = this;
        var sizeMB = +(files[0].size / 1000 / 1000).toFixed(4);
        if (sizeMB > 20) {
            this.fileLimitCross();
            return;
        }
        this.formData = new FormData();
        Array.from(files).forEach(function (f) { return _this.formData.append('file', f); });
        this.preSignedUrl(this.getFileNames(this.formData));
    };
    AttachmentComponent.prototype.fileLimitCross = function () {
        var alertMeta = {
            size: 'tiny',
            bodyType: 'text',
            data: this.translate['frmelmnts'].alert.fileLimitCross20,
            buttonClass: 'single-btn',
            acceptText: this.translate['frmelmnts'].btn.ok,
            cancelText: null,
        };
        this.utils.alert(alertMeta);
    };
    AttachmentComponent.prototype.getFileNames = function (formData) {
        var files = [];
        formData.forEach(function (element) {
            files.push(element.name);
        });
        return files;
    };
    AttachmentComponent.prototype.preSignedUrl = function (files) {
        var _this = this;
        var payload = {};
        payload['ref'] = 'survey';
        payload['request'] = {};
        payload['request'][this.data.submissionId] = {
            files: files,
        };
        this.utils.getPreSingedUrls(payload).subscribe(function (imageData) {
            var presignedUrlData = imageData['result'][_this.data.submissionId].files[0];
            _this.formData.append('url', presignedUrlData.url);
            _this.utils.cloudStorageUpload(_this.formData).subscribe(function (success) {
                var e_1, _a;
                if (success.status === 200) {
                    var obj = {
                        name: _this.getFileNames(_this.formData)[0],
                        url: presignedUrlData.url.split('?')[0],
                    };
                    try {
                        for (var _b = __values(Object.keys(presignedUrlData.payload)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var key = _c.value;
                            obj[key] = presignedUrlData['payload'][key];
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    _this.data.files.push(obj);
                    var alertMeta = {
                        size: 'tiny',
                        bodyType: 'text',
                        data: _this.translate['frmelmnts'].alert.evidenceUploaded,
                        buttonClass: 'single-btn',
                        acceptText: _this.translate['frmelmnts'].btn.ok,
                        cancelText: null,
                        type: 'uploaded',
                    };
                    _this.utils.alert(alertMeta);
                }
                else {
                    _this.utils.error(_this.translate['frmelmnts'].message.unableToUpload);
                }
            }, function (error) {
                _this.utils.error(_this.translate['frmelmnts'].message.unableToUpload);
            });
        }, function (error) {
            console.log(error);
        });
    };
    AttachmentComponent.prototype.extension = function (name) {
        return name.split('.').pop();
    };
    AttachmentComponent.prototype.openFile = function (file) {
        window.open(file.url, '_blank');
    };
    AttachmentComponent.prototype.deleteAttachment = function (fileIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var alertMeta, accepted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alertMeta = {
                            size: 'mini',
                            bodyType: 'text',
                            data: this.translate['frmelmnts'].alert.confirmEvidenceDelete,
                            buttonClass: 'double-btn',
                            acceptText: this.translate['frmelmnts'].btn.ok,
                            cancelText: this.translate['frmelmnts'].btn.no,
                        };
                        return [4 /*yield*/, this.utils.alert(alertMeta)];
                    case 1:
                        accepted = _a.sent();
                        if (!accepted) {
                            return [2 /*return*/];
                        }
                        this.data.files.splice(fileIndex, 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    AttachmentComponent.prototype.onAddApproval = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var html, alertMeta, returnData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        html = "\n    " + this.translate['frmelmnts'].alert.evidence_content_policy + "<a href='/term-of-use.html' target=\"_blank\">" + this.translate['frmelmnts'].alert.evidence_content_policy_label + "</a> ." + this.translate['frmelmnts'].alert.uploadevidencecontent + "\n    ";
                        alertMeta = {
                            size: 'tiny',
                            bodyType: 'checkbox',
                            data: html,
                            buttonClass: 'double-btn',
                            acceptText: this.translate['frmelmnts'].btn.upload,
                            cancelText: this.translate['frmelmnts'].btn.donotupload,
                        };
                        return [4 /*yield*/, this.utils.alert(alertMeta)];
                    case 1:
                        returnData = _a.sent();
                        if (!returnData) {
                            this.notAccepted();
                            return [2 /*return*/];
                        }
                        file.click();
                        return [2 /*return*/];
                }
            });
        });
    };
    AttachmentComponent.prototype.notAccepted = function () {
        var alertMeta = {
            size: 'tiny',
            bodyType: 'text',
            data: this.translate['frmelmnts'].alert.uploadTermsRejected,
            buttonClass: 'single-btn',
            acceptText: this.translate['frmelmnts'].btn.ok,
            cancelText: null,
            type: 'notAccepted',
        };
        this.utils.alert(alertMeta);
    };
    AttachmentComponent.ctorParameters = function () { return [
        { type: SlTranslateService },
        { type: SlUtilsService }
    ]; };
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
    return AttachmentComponent;
}());
export { AttachmentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL2F0dGFjaG1lbnQvYXR0YWNobWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU8zRDtJQUdFLDZCQUNVLFNBQTZCLEVBQzdCLEtBQXFCO1FBRHJCLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBQzdCLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQzVCLENBQUM7SUFFSixzQ0FBUSxHQUFSLGNBQWtCLENBQUM7SUFFbkIseUNBQVcsR0FBWCxVQUFZLEtBQWE7UUFBekIsaUJBU0M7UUFSQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFD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bEQsSUFBSSxDQUFDLFVBQVUsRUFBRTs0QkFDZixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ25CLHNCQUFPO3lCQUNSO3dCQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7S0FDZDtJQUVELHlDQUFXLEdBQVg7UUFDRSxJQUFNLFNBQVMsR0FBYztZQUMzQixJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUI7WUFDM0QsV0FBVyxFQUFFLFlBQVk7WUFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUMsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLGFBQWE7U0FDcEIsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2dCQWhKb0Isa0JBQWtCO2dCQUN0QixjQUFjOztJQUp0QjtRQUFSLEtBQUssRUFBRTtxREFBTTtJQURILG1CQUFtQjtRQUwvQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6Qixta0NBQTBDOztTQUUzQyxDQUFDO09BQ1csbUJBQW1CLENBcUovQjtJQUFELDBCQUFDO0NBQUEsQUFySkQsSUFxSkM7U0FySlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbGVydE1ldGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FsZXJ0LnR5cGUnO1xuaW1wb3J0IHsgU2xUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2xVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlscy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2wtYXR0YWNobWVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hdHRhY2htZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXR0YWNobWVudC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBBdHRhY2htZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTtcbiAgZm9ybURhdGE7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBTbFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB1dGlsczogU2xVdGlsc1NlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBiYXNpY1VwbG9hZChmaWxlczogRmlsZVtdKSB7XG4gICAgbGV0IHNpemVNQiA9ICsoZmlsZXNbMF0uc2l6ZSAvIDEwMDAgLyAxMDAwKS50b0ZpeGVkKDQpO1xuICAgIGlmIChzaXplTUIgPiAyMCkge1xuICAgICAgdGhpcy5maWxlTGltaXRDcm9zcygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgQXJyYXkuZnJvbShmaWxlcykuZm9yRWFjaCgoZikgPT4gdGhpcy5mb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmKSk7XG4gICAgdGhpcy5wcmVTaWduZWRVcmwodGhpcy5nZXRGaWxlTmFtZXModGhpcy5mb3JtRGF0YSkpO1xuICB9XG5cbiAgZmlsZUxpbWl0Q3Jvc3MoKSB7XG4gICAgY29uc3QgYWxlcnRNZXRhOiBBbGVydE1ldGEgPSB7XG4gICAgICBzaXplOiAndGlueScsXG4gICAgICBib2R5VHlwZTogJ3RleHQnLFxuICAgICAgZGF0YTogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmFsZXJ0LmZpbGVMaW1pdENyb3NzMjAsXG4gICAgICBidXR0b25DbGFzczogJ3NpbmdsZS1idG4nLFxuICAgICAgYWNjZXB0VGV4dDogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi5vayxcbiAgICAgIGNhbmNlbFRleHQ6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLnV0aWxzLmFsZXJ0KGFsZXJ0TWV0YSk7XG4gIH1cblxuICBnZXRGaWxlTmFtZXMoZm9ybURhdGEpIHtcbiAgICBsZXQgZmlsZXMgPSBbXTtcbiAgICBmb3JtRGF0YS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBmaWxlcy5wdXNoKGVsZW1lbnQubmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbGVzO1xuICB9XG5cbiAgcHJlU2lnbmVkVXJsKGZpbGVzKSB7XG4gICAgbGV0IHBheWxvYWQgPSB7fTtcbiAgICBwYXlsb2FkWydyZWYnXSA9ICdzdXJ2ZXknO1xuICAgIHBheWxvYWRbJ3JlcXVlc3QnXSA9IHt9O1xuICAgIHBheWxvYWRbJ3JlcXVlc3QnXVt0aGlzLmRhdGEuc3VibWlzc2lvbklkXSA9IHtcbiAgICAgIGZpbGVzOiBmaWxlcyxcbiAgICB9O1xuICAgIHRoaXMudXRpbHMuZ2V0UHJlU2luZ2VkVXJscyhwYXlsb2FkKS5zdWJzY3JpYmUoXG4gICAgICAoaW1hZ2VEYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXNpZ25lZFVybERhdGEgPVxuICAgICAgICAgIGltYWdlRGF0YVsncmVzdWx0J11bdGhpcy5kYXRhLnN1Ym1pc3Npb25JZF0uZmlsZXNbMF07XG4gICAgICAgIHRoaXMuZm9ybURhdGEuYXBwZW5kKCd1cmwnLCBwcmVzaWduZWRVcmxEYXRhLnVybCk7XG4gICAgICAgIHRoaXMudXRpbHMuY2xvdWRTdG9yYWdlVXBsb2FkKHRoaXMuZm9ybURhdGEpLnN1YnNjcmliZShcbiAgICAgICAgICAoc3VjY2VzczogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3VjY2Vzcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5nZXRGaWxlTmFtZXModGhpcy5mb3JtRGF0YSlbMF0sXG4gICAgICAgICAgICAgICAgdXJsOiBwcmVzaWduZWRVcmxEYXRhLnVybC5zcGxpdCgnPycpWzBdLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhwcmVzaWduZWRVcmxEYXRhLnBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBwcmVzaWduZWRVcmxEYXRhWydwYXlsb2FkJ11ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmRhdGEuZmlsZXMucHVzaChvYmopO1xuICAgICAgICAgICAgICBjb25zdCBhbGVydE1ldGE6IEFsZXJ0TWV0YSA9IHtcbiAgICAgICAgICAgICAgICBzaXplOiAndGlueScsXG4gICAgICAgICAgICAgICAgYm9keVR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYWxlcnQuZXZpZGVuY2VVcGxvYWRlZCxcbiAgICAgICAgICAgICAgICBidXR0b25DbGFzczogJ3NpbmdsZS1idG4nLFxuICAgICAgICAgICAgICAgIGFjY2VwdFRleHQ6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4ub2ssXG4gICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICB0eXBlOiAndXBsb2FkZWQnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB0aGlzLnV0aWxzLmFsZXJ0KGFsZXJ0TWV0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnV0aWxzLmVycm9yKFxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5tZXNzYWdlLnVuYWJsZVRvVXBsb2FkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXRpbHMuZXJyb3IoXG4gICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5tZXNzYWdlLnVuYWJsZVRvVXBsb2FkXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBleHRlbnNpb24obmFtZSkge1xuICAgIHJldHVybiBuYW1lLnNwbGl0KCcuJykucG9wKCk7XG4gIH1cbiAgb3BlbkZpbGUoZmlsZSkge1xuICAgIHdpbmRvdy5vcGVuKGZpbGUudXJsLCAnX2JsYW5rJyk7XG4gIH1cblxuICBhc3luYyBkZWxldGVBdHRhY2htZW50KGZpbGVJbmRleCkge1xuICAgIGNvbnN0IGFsZXJ0TWV0YTogQWxlcnRNZXRhID0ge1xuICAgICAgc2l6ZTogJ21pbmknLFxuICAgICAgYm9keVR5cGU6ICd0ZXh0JyxcbiAgICAgIGRhdGE6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5hbGVydC5jb25maXJtRXZpZGVuY2VEZWxldGUsXG4gICAgICBidXR0b25DbGFzczogJ2RvdWJsZS1idG4nLFxuICAgICAgYWNjZXB0VGV4dDogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi5vayxcbiAgICAgIGNhbmNlbFRleHQ6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4ubm8sXG4gICAgfTtcbiAgICBjb25zdCBhY2NlcHRlZCA9IGF3YWl0IHRoaXMudXRpbHMuYWxlcnQoYWxlcnRNZXRhKTtcblxuICAgIGlmICghYWNjZXB0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kYXRhLmZpbGVzLnNwbGljZShmaWxlSW5kZXgsIDEpO1xuICB9XG5cbiAgYXN5bmMgb25BZGRBcHByb3ZhbChmaWxlKSB7XG4gICAgbGV0IGh0bWwgPSBgXG4gICAgJHt0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYWxlcnQuZXZpZGVuY2VfY29udGVudF9wb2xpY3l9PGEgaHJlZj0nL3Rlcm0tb2YtdXNlLmh0bWwnIHRhcmdldD1cIl9ibGFua1wiPiR7dGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmFsZXJ0LmV2aWRlbmNlX2NvbnRlbnRfcG9saWN5X2xhYmVsfTwvYT4gLiR7dGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmFsZXJ0LnVwbG9hZGV2aWRlbmNlY29udGVudH1cbiAgICBgO1xuICAgIGNvbnN0IGFsZXJ0TWV0YTogQWxlcnRNZXRhID0ge1xuICAgICAgc2l6ZTogJ3RpbnknLFxuICAgICAgYm9keVR5cGU6ICdjaGVja2JveCcsXG4gICAgICBkYXRhOiBodG1sLFxuICAgICAgYnV0dG9uQ2xhc3M6ICdkb3VibGUtYnRuJyxcbiAgICAgIGFjY2VwdFRleHQ6IHRoaXMudHJhbnNsYXRlWydmcm1lbG1udHMnXS5idG4udXBsb2FkLFxuICAgICAgY2FuY2VsVGV4dDogdGhpcy50cmFuc2xhdGVbJ2ZybWVsbW50cyddLmJ0bi5kb25vdHVwbG9hZCxcbiAgICB9O1xuICAgIGxldCByZXR1cm5EYXRhID0gYXdhaXQgdGhpcy51dGlscy5hbGVydChhbGVydE1ldGEpO1xuICAgIGlmICghcmV0dXJuRGF0YSkge1xuICAgICAgdGhpcy5ub3RBY2NlcHRlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmaWxlLmNsaWNrKCk7XG4gIH1cblxuICBub3RBY2NlcHRlZCgpOiB2b2lkIHtcbiAgICBjb25zdCBhbGVydE1ldGE6IEFsZXJ0TWV0YSA9IHtcbiAgICAgIHNpemU6ICd0aW55JyxcbiAgICAgIGJvZHlUeXBlOiAndGV4dCcsXG4gICAgICBkYXRhOiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYWxlcnQudXBsb2FkVGVybXNSZWplY3RlZCxcbiAgICAgIGJ1dHRvbkNsYXNzOiAnc2luZ2xlLWJ0bicsXG4gICAgICBhY2NlcHRUZXh0OiB0aGlzLnRyYW5zbGF0ZVsnZnJtZWxtbnRzJ10uYnRuLm9rLFxuICAgICAgY2FuY2VsVGV4dDogbnVsbCxcbiAgICAgIHR5cGU6ICdub3RBY2NlcHRlZCcsXG4gICAgfTtcbiAgICB0aGlzLnV0aWxzLmFsZXJ0KGFsZXJ0TWV0YSk7XG4gIH1cbn1cbiJdfQ==