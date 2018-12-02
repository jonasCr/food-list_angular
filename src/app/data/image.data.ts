import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Image } from '../shared/models/image.model';
import { Observable, Subscription } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root',
})
export class ImageData {
    private collection:AngularFirestoreCollection<Image> = this._afs.collection('photos');
    private FOLDER_IMAGES = 'img'
    constructor(
        private _afs:AngularFirestore,
        private _fireStorage:AngularFireStorage
    ){
        // this._fireStorage.ref(`${this.FOLDER_IMAGES}/custom-select.png`).getMetadata().subscribe(data => {
        //     console.log(data);
        // });
    }

    uploadImage(file:File):Promise<Image>{
        debugger;
        return new Promise(resolve => {
            let response:Image;
            
            const uploadTask = this._fireStorage.upload(`${this.FOLDER_IMAGES}/${file.name}`, file)
            uploadTask.snapshotChanges().pipe(
                finalize(()=> {
                    this._fireStorage.ref(`${this.FOLDER_IMAGES}/${file.name}`).getDownloadURL().subscribe((data)=> {
                        response = new Image({
                            name: file.name,
                            url: data
                        })
                        
                        console.log(response)
                        this.collection.add(Object.assign({},response));
                        resolve(response);
                    });
                })
            ).subscribe();
        })
        
        
    }

    getImageUrl(imageName:string):Observable<string>{
        //let response;
        return this._fireStorage.ref(`${this.FOLDER_IMAGES}/${imageName}`).getDownloadURL()
    }

    addImage(image:Image){
        this.collection.add(image);
    }

    getImages(){
        return this.collection.snapshotChanges().pipe(
           map(images => images.map( a =>{
               const data = a.payload.doc.data();
               const idImage = a.payload.doc.id;
               return {idImage, ...data}
           }))
       ); 
    }

    updateImage(image:Image){
        this.collection.doc(image.idImage).set(image);
    }

    deleteRecipe(image:Image){
        this.collection.doc(image.idImage).delete();
    }
    
}