import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { HelperProvider } from '../helper/helper';
import {TranslateService} from '@ngx-translate/core';
@Injectable()
export class MainserviceProvider {

  constructor(public translate:TranslateService,  public http: HttpClient,public toastCtrl: ToastController,public helper:HelperProvider) {
    console.log('Hello MainserviceProvider Provider');
  }


  Login(params){
     let body={
       'email':params.Email,
       'password':params.Password,
       'mobile_token':'d0STPJpWufk:APA91bEQgExnAGho9ZV1ynqwsK5SDTcxAcdFurYuu4IXJkbOGE5b9UrlAZ-0lqJU9mGdSb_cQ2Nn-wzOv_doXZmXOqExE_u4Twy5ULS5FHYwDFPwRZ6L55oPXr3PmrGEEHIuTxkOibZ_'
       // this.helper.FulleyToken
     }
     console.log( JSON.stringify(body))
    if(navigator.onLine){
      return this.http.post(this.helper.base_url+'login',body);
    }
    else{
      this.Toast_service("check connection",3000)
    }
  }

  register(params,lat,lang){
    console.log(lat,lang)
    let body={
      'phone':params.Phone,
      'email':params.Email,
      'name':params.Name,
      'password':params.Password,
      'confirmation_password':params.PasswordConfrim,
      'lat':lat,
      'lang':lang
    }
    if(navigator.onLine){
      return this.http.post(this.helper.base_url+'register',body);
    }
    else{
      this.Toast_service("check connection",3000)
    }
  }

  sendCode(params){
    let body={
      'phone':params.Phone
    }
    if(navigator.onLine){
      return this.http.post(this.helper.base_url+'sendCode',body);
    }
    else{
      this.Toast_service("check connection",3000)
    }
  }

  checkCode(phone,code){
    let body={
      'phone':phone,
      'code':code
    }
    if(navigator.onLine){
      return this.http.post(this.helper.base_url+'checkCode',body);
    }
    else{
      this.Toast_service("check connection",3000)
    }
  }

  updatePassword(params){
    let body={
      'phone':params.Phone,
      'password':params.Password,
      'confirmation_password':params.ConfirmationPassword
    }
    if(navigator.onLine){
      return this.http.post(this.helper.base_url+'updatePassword',body);
    }
    else{
      this.Toast_service("check connection",3000)
    }
  }
  //------------------------------------- user ----------------------------//
  home(UserToken){
    console.log(UserToken)
    let headers = new HttpHeaders();
    headers=   headers.set('Authorization',UserToken)
    let body={
      'filter':'near',
    }
    if(navigator.onLine){
      return this.http.post(this.helper.base_url+'home',body,{headers:headers});
    }
    else{
      this.Toast_service("check connection",3000)
    }
  }

  search(searchText){
    let body={
      'name':searchText,
    }
    if(navigator.onLine){
      return this.http.post(this.helper.base_url+'search',body);
    }
    else{
      this.Toast_service("check connection",3000)
    }
  }
//--------------------------------- station ---------------------------------//
registerStation(params,lat,long,file1,file2,file3,avatar){
  console.log(file1,file2,file3)
  let body={
    'avatar':avatar,
    'email':params.Email,
    'name':params.StationName,
    'phone':params.Mobile,
    'address':params.Address,
    'lat':lat,
    'lang':long,
    'ownership':file1,
    'license':file2,
    'national_id':file3
  }
  if(navigator.onLine){
    return this.http.post(this.helper.base_url+'registerStation',body);
  }
  else{
    this.Toast_service("check connection",3000)
  }
}

addOrder(station_id,service_id,price,liters,UserToken){
  let headers = new HttpHeaders();
  headers=headers.set('Accept','application/json')
  .set('Authorization',UserToken)
  let body={
    'station_id':station_id,
    'service_id':service_id,
    'price':price,
    'liters':liters
  }
  if(navigator.onLine){
    return this.http.post(this.helper.base_url+'addOrder',body,{headers:headers});
  }
  else{
    this.Toast_service("check connection",3000)
  }
}

myOrders(UserToken){
  let body={}
  let headers = new HttpHeaders();
  headers=headers.set('Accept','application/json')
  .set('Authorization',UserToken)
  if(navigator.onLine){
    return this.http.get(this.helper.base_url+'myOrders',{headers:headers});
  }
  else{
    this.Toast_service("check connection",3000)
  }
}

orderDetails(order_id){
  let body={'order_id':order_id}

  if(navigator.onLine){
    return this.http.post(this.helper.base_url+'orderDetails',body);
  }
  else{
    this.Toast_service("check connection",3000)
  }
}

profile(UserToken,station_id){
  let body={'user_id':station_id}
  let headers = new HttpHeaders();
  headers=headers.set('Authorization',UserToken)
  if(navigator.onLine){
    return this.http.post(this.helper.base_url+'profile',body,{headers:headers});
  }
  else{
    this.Toast_service("check connection",3000)
  }
}

Editprofile(data){
  let body={'user_id':data}
  let headers = new HttpHeaders();
  ////headers=headers.set('Authorization',UserToken)
  if(navigator.onLine){
    return this.http.post(this.helper.base_url+'editprofile',body);
  }
  else{
    this.Toast_service("check connection",3000)
  }
}

offerDetails(offer_id){
  let body={'offer_id':offer_id}

  if(navigator.onLine){
    return this.http.post(this.helper.base_url+'offerDetails',body);
  }
  else{
    this.Toast_service("check connection",3000)
  }
}
//----------------------------------- worker --------------------------------------------------//

acceptOrder(order_id){
  let body={'order_id':order_id}

  if(navigator.onLine){
    return this.http.post(this.helper.base_url+'acceptOrder',body);
  }
  else{
    this.Toast_service("check connection",3000)
  }
}
//---------------------------------------General -------------------------------------------------//
aboutus(){
  if(navigator.onLine){
    return this.http.get(this.helper.base_url+'aboutus');
  }
  else{
    this.Toast_service(this.translate.instant("check connection"),3000)
  }
}
Toast_service(message,duration){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
