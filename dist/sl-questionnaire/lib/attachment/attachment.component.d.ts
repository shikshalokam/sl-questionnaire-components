import { OnInit } from '@angular/core';
import { SlTranslateService } from '../services/translate.service';
import { SlUtilsService } from '../services/utils.service';
export declare class AttachmentComponent implements OnInit {
    private translate;
    private utils;
    data: any;
    formData: any;
    constructor(translate: SlTranslateService, utils: SlUtilsService);
    ngOnInit(): void;
    basicUpload(files: File[]): void;
    fileLimitCross(): void;
    getFileNames(formData: any): any[];
    preSignedUrl(files: any): void;
    extension(name: any): any;
    openFile(file: any): void;
    deleteAttachment(fileIndex: any): Promise<void>;
    onAddApproval(file: any): Promise<void>;
    notAccepted(): void;
}
