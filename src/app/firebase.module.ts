import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
    ],
    exports: [
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
    ],
    providers: [],
})
export class FirebaseModule {}