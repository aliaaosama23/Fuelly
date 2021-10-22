import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ToastController, LoadingController ,Platform} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HelperProvider} from '../../providers/helper/helper';
import {MainserviceProvider} from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
@IonicPage()
@Component({
  selector: 'page-code-verification',
  templateUrl: 'code-verification.html',
})
export class CodeVerificationPage {
 // @ViewChild('otp4') myInput;
  myForm:FormGroup
  code:any
  Email:any
  comefrom:any
  phone:any
  constructor(public menuCtrl:MenuController,public translate: TranslateService,public toastCtrl: ToastController,public service:MainserviceProvider,
    private platform:Platform, public navCtrl: NavController,private storage: Storage,
    public formBuilder:FormBuilder, public navParams: NavParams) {
   // this.platform.setDir('ltr',true)
   this.menuCtrl.enable(false)

    this.myForm = this.formBuilder.group({
      codeInput1: ['', Validators.required],
      codeInput2: ['', Validators.required],
      codeInput3: ['', Validators.required],
      codeInput4: ['', Validators.required]
    });
   this.comefrom= this.navParams.get('comefrom')
   console.log("phone     :"+this.navParams.get('phone'))
      this.phone=this.navParams.get('phone')
  }

  next(el) {
    el.setFocus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeVerificationPage');
  }

  logForm(){
    console.log("code"+JSON.stringify(this.myForm.value))
    //this.navCtrl.push('LoginPage')
    this.code=this.myForm.value.codeInput1+this.myForm.value.codeInput2+this.myForm.value.codeInput3+this.myForm.value.codeInput4
    console.log("code is.."+this.code)
    this.service.sendCode(this.navParams.get('phone')).subscribe(
      (res:any)=>{
        this.service.checkCode(this.navParams.get('phone'),this.code).subscribe(
          (res:any)=>{
            if(this.comefrom==undefined){
              if(res.status==true){
                const toast = this.toastCtrl.create({
                  message: res.msg,
                  duration: 3000
                });
                toast.present();
                toast.onDidDismiss(()=>{
                  this.storage.set('fulley_user_logined',true)
                  this.navCtrl.setRoot('HomePage')
                })
              }else{
                const toast = this.toastCtrl.create({
                  message: res.msg,
                  duration: 3000
                });
                toast.present();
              }
            }else if(this.comefrom=='forgetpass'){
              if(res.status==true){
                const toast = this.toastCtrl.create({
                  message: res.msg,
                  duration: 3000
                });
                toast.present();
                toast.onDidDismiss(()=>{
                  this.navCtrl.setRoot('UpdatePasswordPage')
                })
              }else{
                const toast = this.toastCtrl.create({
                  message: res.msg,
                  duration: 3000
                });
                toast.present();
              }
            }

          },
          (err:any)=>{
          })
      },
      (err:any)=>{
      }
    )
  }

  resendCode(){
     this.myForm.reset()
     this.code=this.myForm.value.codeInput1+this.myForm.value.codeInput2+this.myForm.value.codeInput3+this.myForm.value.codeInput4
     console.log( " resend code--- code is.."+this.code)
     console.log("resend....."+this.navParams.get('phone'))
     this.service.sendCode(this.phone).subscribe(
       (res:any)=>{
         this.service.checkCode(this.navParams.get('phone'),this.code).subscribe(
           (res:any)=>{
               if(res.status==true){
                // this.storage.set('station_log_in',true);
                 const toast = this.toastCtrl.create({
                   message: res.msg,
                   duration: 3000
                 });
                 toast.present();
                 toast.onDidDismiss(()=>{
                   this.navCtrl.setRoot('HomePage')
                 })
               }else{
               }
           },
           (err:any)=>{
           })
       },
       (err:any)=>{
       }
     )
  }

}
