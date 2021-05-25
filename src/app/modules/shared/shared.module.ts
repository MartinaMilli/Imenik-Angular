import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSortModule,
        LoadingSpinnerModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSortModule,
        LoadingSpinnerModule
    ]
})
export class SharedModule{}
