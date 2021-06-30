import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let PageQuestionsComponent = class PageQuestionsComponent {
    constructor() { }
    ngOnInit() { }
};
__decorate([
    Input()
], PageQuestionsComponent.prototype, "questionnaireForm", void 0);
__decorate([
    Input()
], PageQuestionsComponent.prototype, "question", void 0);
PageQuestionsComponent = __decorate([
    Component({
        selector: 'sl-page-questions',
        template: "<sl-input\n  [questions]=\"question.pageQuestions\"\n  [questionnaireForm]=\"questionnaireForm\"\n></sl-input>\n",
        styles: [""]
    })
], PageQuestionsComponent);
export { PageQuestionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1xdWVzdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9wYWdlLXF1ZXN0aW9ucy9wYWdlLXF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBU3pELElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBR2pDLGdCQUFlLENBQUM7SUFFaEIsUUFBUSxLQUFVLENBQUM7Q0FDcEIsQ0FBQTtBQUxVO0lBQVIsS0FBSyxFQUFFO2lFQUE4QjtBQUM3QjtJQUFSLEtBQUssRUFBRTt3REFBd0I7QUFGckIsc0JBQXNCO0lBTGxDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsNEhBQThDOztLQUUvQyxDQUFDO0dBQ1csc0JBQXNCLENBTWxDO1NBTlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQYWdlUXVlc3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3F1ZXN0aW9ubmFpcmUudHlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NsLXBhZ2UtcXVlc3Rpb25zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2UtcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGFnZS1xdWVzdGlvbnMuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlUXVlc3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcXVlc3Rpb25uYWlyZUZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgcXVlc3Rpb246IFBhZ2VRdWVzdGlvbjtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cbn1cbiJdfQ==