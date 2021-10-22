import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

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
          },
          (err:any)=>{
            loading.dismiss()
          }
        )
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  hideShowPassword()
  {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  back(){
    this.viewCtrl.dismiss()
  }

  showPass(){
    if(this.show){
      this.show=false
    }else{
      this.show=true
    }
  }

  Edit(){
    let data={
      'email':this.Email,
      'name':this.Name,
      'password':this.Password
    }
    console.log(JSON.stringify(data))
    // call api to edit profile data
    let loading=this.loadingCtrl.create({})
    loading.present()
     this.service.Editprofile(data).subscribe(
       (res:any)=>{
         loading.dismiss()
           if(res.status){
             this.navCtrl.setRoot('HomePage')
           }
       },(err:any)=>{
        loading.dismiss()
       }
     )
  }


}
