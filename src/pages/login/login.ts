import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ToastController,Platform, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HelperProvider} from '../../providers/helper/helper';
import {MainserviceProvider} from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myForm_login:FormGroup
  myForm_register:FormGroup
  login:boolean=true
  worker:boolean=false
  comefrom:any
  lat:any='0'
  lang:any='0'
  language:any
  constructor(public  translate: TranslateService,public toastCtrl: ToastController,
    public helper:HelperProvider,private platform: Platform,public menuCtrl:MenuController,
     public loadingCtrl:LoadingController,private geolocation: Geolocation,public events:Events,
    public service:MainserviceProvider,private storage: Storage,public navCtrl: NavController,
    public formBuilder:FormBuilder,public navParams: NavParams) {
      this.menuCtrl.enable(false)

            this.platform.ready().then(()=>{
              this.storage.get('Fulleylanguage').then((val:any)=>{
                console.log(val)
               if(val){
                 if(val=='ar'){
                   translate.use('ar')
                   translate.setDefaultLang('ar')
                   this.platform.setDir('rtl',true)
                   this.helper.set_language('ar')
                   this.language='ar'
                 }else{
                   translate.use('en')
                   translate.setDefaultLang('en')
                   this.platform.setDir('rtl',true)
                   this.helper.set_language('en')
                   this.language='en'
                 }
               }else{
                   translate.use('ar')
                   translate.setDefaultLang('ar')
                   this.platform.setDir('rtl',true)
                   this.helper.set_language('ar')
                   this.language='ar'
               }

               translate.use(this.language)
              })

      //  this.diagnostic.isGpsLocationEnabled().then((val:any)=>{
        //  console.log("isGpsLocationEnabled  res   :"+JSON.stringify(val))
          this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
            this.lat=resp.coords.latitude
            this.lang=resp.coords.longitude
          }).catch((error) => {
            console.log('Error getting location', error);
          });
       // })

       })
      this.comefrom=this.navParams.get('comefrom')

        if(this.comefrom=='worker'){
          this.login=true
          this.worker=true
        }else{
          this.worker=false
        }

        this.myForm_login = this.formBuilder.group({
          Email: ['',Validators. compose([Validators.required,Validators.email])],
          Password: ['', Validators.compose([Validators.required,Validators.minLength(6)])]
        });

        this.myForm_register = this.formBuilder.group({
          Email: ['',Validators. compose([Validators.required,Validators.email])],
          Phone: ['',Validators. compose([Validators.required])],
          Name:['', Validators.required],
          Password: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
          PasswordConfrim: ['', Validators.compose([Validators.required,Validators.minLength(6)])]
        });


  }

    ionViewWillEnter() {

  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');

    }

  logForm_login(){
   console.log('is worker....'+this.worker)
      if(this.worker==true){
        // call api to signin worker then take him to worker screens
        let loading=this.loadingCtrl.create({})
        loading.present()


        this.service.Login(this.myForm_login.value).subscribe(
          (res:any)=>{
            loading.dismiss()
            if(res.status){
              const toast = this.toastCtrl.create({
                message: res.msg,
                duration: 3000
              });
              toast.present();
              toast.onDidDismiss(()=>{

                this.storage.set('fulley_worker_logined',true)
                this.storage.set("fulley_type",res.data.type)
                this.events.publish('logined','worker')
                this.navCtrl.setRoot('ScanPage')
              })
            }else{
              const toast = this.toastCtrl.create({
                message: res.msg,
                duration: 3000
              });
              toast.present();

            }
          },(err:any)=>{
            loading.dismiss()

          }
       )

      } else{
        // call api to signin user then take him to user screens
          let loading=this.loadingCtrl.create({})
          loading.present()

          this.service.Login(this.myForm_login.value).subscribe(
            (res:any)=>{
              loading.dismiss()
              if(res.status){
                this.storage.set('fulley_user_password',this.myForm_login.value.Password)
                this.storage.set('fulley_user_logined',true)
                this.storage.set('fulley_user_token',res.data.token)
                this.storage.set("fulley_type",res.data.type)
                this.storage.set('fulley_user_id',res.data.id)
                this.events.publish('logined','user')
                  this.navCtrl.setRoot('HomePage')
              }else {
                // check if the user did not activate his account
                const toast = this.toastCtrl.create({
                  message: res.msg,
                  duration: 3000
                });
                toast.present();
                toast.onDidDismiss(()=>{
                  this.storage.set('fulley_user_password',this.myForm_login.value.Password)
                })
              }
            },(err:any)=>{
              loading.dismiss()
             if(err.error.msg=="Unauthorised"){
              const toast = this.toastCtrl.create({
                message: this.translate.instant("error in email or password"),
                duration: 3000
              });
              toast.present();
             }

               }
          )}
  }
  change(lang){
    if(lang=='ar'){
      this.platform.setDir('rtl',true)
      this.translate.setDefaultLang('ar')
      this.translate.use('ar')
      this.storage.set('Fulleylanguage','ar')
      this.language='ar'
    }else if(lang=='en'){
      this.platform.setDir('ltr',true)
      this.translate.setDefaultLang('en')
      this.translate.use('en')
      this.storage.set('Fulleylanguage','en')
      this.language='en'
    }
  }
  logForm_register(){
      let loading=this.loadingCtrl.create({})
      loading.present()
       this.service.register(this.myForm_register.value,this.lat,this.lang).subscribe(
         (res:any)=>{
           loading.dismiss()
           if(res.status){
             const toast = this.toastCtrl.create({
               message: this.translate.instant("code sent to your mobile"),
               duration: 3000
             });
             toast.present();
             toast.onDidDismiss(()=>{
              // localStorage.set('fulley_phone',this.myForm_register.value.Phone)
               this.storage.set('fulley_user_id',res.data.id)
               this.storage.set("fulley_type",res.data.type)
               this.storage.set('fulley_user_password',this.myForm_register.value.Password)
               this.storage.set('fulley_user_token',res.data.token)
               this.navCtrl.push('CodeVerificationPage',{'phone':this.myForm_register.value.Phone})
             })
           }else{
             const toast = this.toastCtrl.create({
               message: res.msg,
               duration: 3000
             });
             toast.present();
           }
         },(err:any)=>{
           loading.dismiss()
         })
   }

  forget_password(){
   this.navCtrl.push('ForgetpasswordPage',{'phone':this.myForm_register.value.Phone})
  }

  signup(){
   this.login=false
  }

  signin(){
    this.login=true
  }

}
