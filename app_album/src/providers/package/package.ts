import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foto } from '../../model/Foto'

/*
  Generated class for the PackageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PackageProvider {

  constructor() {
  }

  getFotosPackage(photos:Foto[], currentLocation:any){
    let body = [];
    let location = [];
    
    photos.forEach((photo, index) => {
      let objeto = {};
      objeto[index.toString()] = photo.getLocation();
      location.push(objeto);
    });

    body["location"] = location;
    return {
      method: "POST",
      url: 'upload',
      body: body
    }
  }

}
