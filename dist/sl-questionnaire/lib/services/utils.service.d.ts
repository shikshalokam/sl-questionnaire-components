import { SuiModalService } from 'ng2-semantic-ui-v9';
import { AlertMeta } from '../interfaces/alert.type';
export declare abstract class SlUtilsService {
    modalService: SuiModalService;
    constructor(modalService: SuiModalService);
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
    alert(meta: AlertMeta): Promise<any>;
    abstract openAlert(data: any): Promise<any>;
    abstract error(msg: any): any;
    abstract getPreSingedUrls(payload: any): any;
    abstract cloudStorageUpload(payload: any): any;
}
