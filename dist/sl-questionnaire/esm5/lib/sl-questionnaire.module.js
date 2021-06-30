import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { SuiModule } from 'ng2-semantic-ui-v9';
import { NumberInputComponent } from './number-input/number-input.component';
import { RangeInputComponent } from './range-input/range-input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { CheckboxInputComponent } from './checkbox-input/checkbox-input.component';
import { QuesRemarksComponent } from './ques-remarks/ques-remarks.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { InputComponent } from './input/input.component';
import { PageQuestionsComponent } from './page-questions/page-questions.component';
import { MatrixQuestionsComponent } from './matrix-questions/matrix-questions.component';
var SlQuestionnaireModule = /** @class */ (function () {
    function SlQuestionnaireModule() {
    }
    SlQuestionnaireModule = __decorate([
        NgModule({
            declarations: [
                TextInputComponent,
                DateInputComponent,
                NumberInputComponent,
                RangeInputComponent,
                RadioInputComponent,
                CheckboxInputComponent,
                QuesRemarksComponent,
                AttachmentComponent,
                InputComponent,
                PageQuestionsComponent,
                MatrixQuestionsComponent,
            ],
            imports: [CommonModule, FormsModule, ReactiveFormsModule, SuiModule],
            exports: [
                TextInputComponent,
                DateInputComponent,
                NumberInputComponent,
                RangeInputComponent,
                RadioInputComponent,
                CheckboxInputComponent,
                QuesRemarksComponent,
                AttachmentComponent,
                InputComponent,
                PageQuestionsComponent,
                MatrixQuestionsComponent,
            ],
        })
    ], SlQuestionnaireModule);
    return SlQuestionnaireModule;
}());
export { SlQuestionnaireModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2wtcXVlc3Rpb25uYWlyZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbC1xdWVzdGlvbm5haXJlLyIsInNvdXJjZXMiOlsibGliL3NsLXF1ZXN0aW9ubmFpcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQStCekY7SUFBQTtJQUFvQyxDQUFDO0lBQXhCLHFCQUFxQjtRQTdCakMsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLGtCQUFrQjtnQkFDbEIsa0JBQWtCO2dCQUNsQixvQkFBb0I7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUNuQixzQkFBc0I7Z0JBQ3RCLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQixjQUFjO2dCQUNkLHNCQUFzQjtnQkFDdEIsd0JBQXdCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxTQUFTLENBQUM7WUFDcEUsT0FBTyxFQUFFO2dCQUNQLGtCQUFrQjtnQkFDbEIsa0JBQWtCO2dCQUNsQixvQkFBb0I7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUNuQixzQkFBc0I7Z0JBQ3RCLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQixjQUFjO2dCQUNkLHNCQUFzQjtnQkFDdEIsd0JBQXdCO2FBQ3pCO1NBQ0YsQ0FBQztPQUNXLHFCQUFxQixDQUFHO0lBQUQsNEJBQUM7Q0FBQSxBQUFyQyxJQUFxQztTQUF4QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVGV4dElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWlucHV0L3RleHQtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1pbnB1dC9kYXRlLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWlNb2R1bGUgfSBmcm9tICduZzItc2VtYW50aWMtdWktdjknO1xuaW1wb3J0IHsgTnVtYmVySW5wdXRDb21wb25lbnQgfSBmcm9tICcuL251bWJlci1pbnB1dC9udW1iZXItaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IFJhbmdlSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL3JhbmdlLWlucHV0L3JhbmdlLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYWRpb0lucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9yYWRpby1pbnB1dC9yYWRpby1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hlY2tib3hJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gtaW5wdXQvY2hlY2tib3gtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IFF1ZXNSZW1hcmtzQ29tcG9uZW50IH0gZnJvbSAnLi9xdWVzLXJlbWFya3MvcXVlcy1yZW1hcmtzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdHRhY2htZW50Q29tcG9uZW50IH0gZnJvbSAnLi9hdHRhY2htZW50L2F0dGFjaG1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZVF1ZXN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vcGFnZS1xdWVzdGlvbnMvcGFnZS1xdWVzdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdHJpeFF1ZXN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vbWF0cml4LXF1ZXN0aW9ucy9tYXRyaXgtcXVlc3Rpb25zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRleHRJbnB1dENvbXBvbmVudCxcbiAgICBEYXRlSW5wdXRDb21wb25lbnQsXG4gICAgTnVtYmVySW5wdXRDb21wb25lbnQsXG4gICAgUmFuZ2VJbnB1dENvbXBvbmVudCxcbiAgICBSYWRpb0lucHV0Q29tcG9uZW50LFxuICAgIENoZWNrYm94SW5wdXRDb21wb25lbnQsXG4gICAgUXVlc1JlbWFya3NDb21wb25lbnQsXG4gICAgQXR0YWNobWVudENvbXBvbmVudCxcbiAgICBJbnB1dENvbXBvbmVudCxcbiAgICBQYWdlUXVlc3Rpb25zQ29tcG9uZW50LFxuICAgIE1hdHJpeFF1ZXN0aW9uc0NvbXBvbmVudCxcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIFN1aU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBUZXh0SW5wdXRDb21wb25lbnQsXG4gICAgRGF0ZUlucHV0Q29tcG9uZW50LFxuICAgIE51bWJlcklucHV0Q29tcG9uZW50LFxuICAgIFJhbmdlSW5wdXRDb21wb25lbnQsXG4gICAgUmFkaW9JbnB1dENvbXBvbmVudCxcbiAgICBDaGVja2JveElucHV0Q29tcG9uZW50LFxuICAgIFF1ZXNSZW1hcmtzQ29tcG9uZW50LFxuICAgIEF0dGFjaG1lbnRDb21wb25lbnQsXG4gICAgSW5wdXRDb21wb25lbnQsXG4gICAgUGFnZVF1ZXN0aW9uc0NvbXBvbmVudCxcbiAgICBNYXRyaXhRdWVzdGlvbnNDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNsUXVlc3Rpb25uYWlyZU1vZHVsZSB7fVxuIl19