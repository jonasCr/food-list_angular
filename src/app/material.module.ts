import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatExpansionModule
    ],
    exports: [
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatExpansionModule
    ],
    providers: [],
})
export class MaterialModule {}