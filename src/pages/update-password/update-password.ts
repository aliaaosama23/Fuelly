import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ToastController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HelperProvider} from '../../providers/helper/helper';
import {MainserviceProvider} from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {


  myForm:FormGroup

  login:boolean=true
  constructor(public toastCtrl: ToastController,public translate: TranslateService,
    public helper:HelperProvider, public loadingCtrl:LoadingController,
    public service:MainserviceProvider,public menuCtrl:MenuController,
    private storage: Storage, public navCtrl: NavController, public formBuilder:FormBuilder,
     public navParams: NavParams) {
    this.myForm = this.formBuilder.group({
      Phone: ['',Validators.compose([Validators.required])],
      Password:['',Validators.required],
      ConfirmationPassword:['',Validators.required]
    });
    this.menuCtrl.enable(false)
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }

  logForm(){
    // call api to reset password
    console.log("updatePassword data"+JSON.stringify(this.myForm.value))
    this.service.updatePassword(this.myForm.value).subscribe(
      (res:any)=>{
        console.log("updatePassword tres  :"+JSON.stringify(res))
        if(res.status){
          const toast = this.toastCtrl.create({
            message: res.msg,
            duration: 3000
          });
          toast.present();
          toast.onDidDismiss(()=>{
            this.storage.set('fulley_logined',true)
           // this.storage.set('fulley_user_token',res.data.token)
              this.navCtrl.setRoot('loginPage')
          })
        }


      },(err:any)=>{
        console.log("updatePassword err  :"+JSON.stringify(err))
     })
  }


}
