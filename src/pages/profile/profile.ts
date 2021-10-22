import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 Password:any
 Email:any
 Name:any
 show:Boolean=false
 passwordnumber:any
 array:any[]=[]
  constructor(public translate: TranslateService,public loadingCtrl:LoadingController,
     public service:MainserviceProvider, private storage: Storage,
    public viewCtrl:ViewController, public navCtrl: NavController,
    public navParams: NavParams) {

        this.storage.get('fulley_user_password').then((val:any)=>{
          console.log("password   :"+val)
          this.Password=val
          this.array=this.Password.length
        })

    this.storage.get('fulley_user_id').then((id:any)=>{
      this.storage.get('fulley_user_token').then((token:any)=>{
        let loading=this.loadingCtrl.create({})
        loading.present()
        this.service.profile(token,id).subscribe(
          (res:any)=>{
            loading.dismiss()
            if(res.status){
              this.Email=  res.data.email
              this.Name=  res.data.name
            }
           console.log("profile   res :"+JSON.stringify(res))
          },
          (err:any)=>{
            loading.dismiss()
            console.log("profile   err :"+JSON.stringify(err))
          }
        )
      })

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  hideShowPassword()
  {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  back(){
    this.viewCtrl.dismiss()
  }

  edit(){
   this.navCtrl.push('EditProfilePage')
  }

  showPass(){
  if(this.show){
    this.show=false
  }else{
    this.show=true
  }
  }

}
