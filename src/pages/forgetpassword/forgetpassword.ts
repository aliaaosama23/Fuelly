import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ToastController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HelperProvider} from '../../providers/helper/helper';
import {MainserviceProvider} from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {

  myForm:FormGroup

  login:boolean=true
  constructor(public toastCtrl: ToastController,public translate: TranslateService,
    public helper:HelperProvider, public loadingCtrl:LoadingController,
    public service:MainserviceProvider,public menuCtrl:MenuController,
    private storage: Storage, public navCtrl: NavController, public formBuilder:FormBuilder,
     public navParams: NavParams) {
      this.menuCtrl.enable(false)
          this.myForm = this.formBuilder.group({
      Phone: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }

  logForm(){
    // call api to reset password
    console.log("forget password data"+JSON.stringify(this.myForm.value))
    this.service.sendCode(this.myForm.value).subscribe(
      (res:any)=>{
        console.log("sendCode tres  :"+JSON.stringify(res))
        const toast = this.toastCtrl.create({
          message: res.msg,
          duration: 3000
        });
        toast.present();
        toast.onDidDismiss(()=>{
          this.navCtrl.push('CodeVerificationPage',{'phone':this.myForm.value.Phone,'comefrom':'forgetpass'})
        })

      },(err:any)=>{
        console.log("sendCode err  :"+JSON.stringify(err))
     }
    )
  }

}
