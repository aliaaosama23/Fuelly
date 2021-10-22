import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HelperProvider {
   lat:any;
   long:any;
   FulleyToken:any
   language:any
  base_url:string='http://myfuelly.com/api/v1/'
  constructor(public http: HttpClient) {
    console.log('Hello HelperProvider Provider');
  }

  set_token(va){
   this.FulleyToken=va
  }

  set_lattiude(va){
    this.lat=va
  }

  set_longitude(va){
    this.long=va
  }
  set_language(va){
    this.language=va
  }
}
