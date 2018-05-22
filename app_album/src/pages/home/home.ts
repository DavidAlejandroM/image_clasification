import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Foto } from '../../model/Foto';
import { PackageProvider, HttpProvider } from '../../providers/index';
import { map } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, 
      private packageS:PackageProvider,
      private httpS: HttpProvider,
      private camera: Camera) {

  }

  private options:CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  test(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      
     }, (err) => {
      // Handle error
     });
    /*let foto:Foto = new Foto("foto.jpeg", 6.5534353, -75.00378, 2000);
    let asdf = [foto];

    let packageFotos = this.packageS.getFotosPackage(asdf, "hola");

  
    this.httpS.http(packageFotos).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log("Error respuesta!:", error.json());
      }
    );*/


  }

}
