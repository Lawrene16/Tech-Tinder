import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';


/*
  Generated class for the ImageproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageproviderProvider {

  public cameraImage : String;
  
  constructor(public http: Http, private camera: Camera) {
    console.log('Hello ImageproviderProvider Provider');
  }

  selectImage() : Promise<any>
   {
      return new Promise(resolve =>
      {
         let cameraOptions : CameraOptions = {
             sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this.camera.DestinationType.DATA_URL,
             quality            : 100,
             targetWidth        : 320,
             targetHeight       : 240,
             encodingType       : this.camera.EncodingType.JPEG,
             correctOrientation : true
         };

         this.camera.getPicture(cameraOptions)
         .then((data) =>
         {
            this.cameraImage 	= "data:image/jpeg;base64," + data;
            resolve(this.cameraImage);
         });


      });
   }
}
