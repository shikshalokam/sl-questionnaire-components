import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
var PageQuestionsComponent = /** @class */ (function () {
    function PageQuestionsComponent() {
    }
    PageQuestionsComponent.prototype.ngOnInit = function () { };
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
    return PageQuestionsComponent;
}());
export { PageQuestionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1xdWVzdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2wtcXVlc3Rpb25uYWlyZS8iLCJzb3VyY2VzIjpbImxpYi9wYWdlLXF1ZXN0aW9ucy9wYWdlLXF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBU3pEO0lBR0U7SUFBZSxDQUFDO0lBRWhCLHlDQUFRLEdBQVIsY0FBa0IsQ0FBQztJQUpWO1FBQVIsS0FBSyxFQUFFO3FFQUE4QjtJQUM3QjtRQUFSLEtBQUssRUFBRTs0REFBd0I7SUFGckIsc0JBQXNCO1FBTGxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsNEhBQThDOztTQUUvQyxDQUFDO09BQ1csc0JBQXNCLENBTWxDO0lBQUQsNkJBQUM7Q0FBQSxBQU5ELElBTUM7U0FOWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBhZ2VRdWVzdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvcXVlc3Rpb25uYWlyZS50eXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2wtcGFnZS1xdWVzdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFnZS1xdWVzdGlvbnMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYWdlLXF1ZXN0aW9ucy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VRdWVzdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBxdWVzdGlvbm5haXJlRm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBxdWVzdGlvbjogUGFnZVF1ZXN0aW9uO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxufVxuIl19