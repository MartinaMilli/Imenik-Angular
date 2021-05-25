import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent
    ],
    exports: [
        LoadingSpinnerComponent
    ]
})
export class LoadingSpinnerModule {}
