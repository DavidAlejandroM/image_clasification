
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {map} from 'rxjs/operators';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  private api:string = "http://localhost:3000/";
  private headers:any;

  constructor(public httpS: Http) {
    console.log('Hello HttpProvider Provider');
  }

  http(Package:any){
    let url = this.api + Package.url;
    var response;
    
    if(Package.method == "POST"){
      return this.httpS.post(url,Package.body,{headers: this.headers});
    }

    else if(Package.method == "GET"){
      let params;
      if(Package.urlParams){
        params = this.getUrlParams(Package.urlParams);
      }
      return this.httpS.get(url,{headers: this.headers,params: params},);
    }

  }

  private getUrlParams(urlParams)
  {
    let params: URLSearchParams = new URLSearchParams();
    let keys = Object.keys(urlParams);
    //console.log(keys);
    for (let i = 0; i < keys.length; i++) {
        params.set(keys[i],urlParams[keys[i]]);
    }
    //console.log(params);

     return params;
  }


}
