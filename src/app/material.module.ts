import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material'
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatBadgeModule        
    ],
    exports: [
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatBadgeModule
    ],
    providers: [],
})
export class MaterialModule {}