import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events,
  ToastController, LoadingController, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HelperProvider} from '../../providers/helper/helper';
import {MainserviceProvider} from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-application-form',
  templateUrl: 'application-form.html',
})
export class ApplicationFormPage {
// this page for station owner only to apply to our system
file11:any
file12:any
file13:any
file_Avatar:any
file1:any
file2:any
file3:any
myfile1:any
myfile2:any
myfile3:any
choosefile1:boolean=false
choosefile2:boolean=false
choosefile3:boolean=false
choosefile4:boolean=false
myForm:FormGroup
loading:any
login:boolean=true
myfile_avatar:any
avatar:any
choose_avatar:boolean=false
success:boolean=false
constructor(public events: Events,private file:File,public translate: TranslateService, public viewCtrl:ViewController,  public toastCtrl: ToastController,  public httpc: HttpClient,
  public helper:HelperProvider, public loadingCtrl:LoadingController,
  public service:MainserviceProvider,public menuCtrl:MenuController,
  private storage: Storage, public navCtrl: NavController, public formBuilder:FormBuilder,
   public navParams: NavParams) {
  this.myForm = this.formBuilder.group({
    Email: ['',Validators.compose([Validators.required,Validators.email])],
    StationName: ['',Validators.required],
    Address:['',Validators.required],
    Mobile:['',Validators.required],
    OwnerShip:['',Validators.required],
    Commercial_License:['',Validators.required],
    NationalID:['',Validators.required]
  });
  this.menuCtrl.enable(false)}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationFormPage');
  }

  logForm(){
        console.log("form data..."+JSON.stringify(this.myForm.value))
        console.log(this.helper.lat,this.helper.long)
        this.loading=this.loadingCtrl.create({})
        this.loading.present()
          this.service.registerStation(this.myForm.value,this.helper.lat,this.helper.long,this.myfile1,this.myfile2,this.myfile3, this.myfile_avatar).subscribe(
            (res:any)=>{
              this.loading.dismiss()
              if(res.status){
                const toast = this.toastCtrl.create({
                  message: res.msg,
                  duration: 3000
                });
                toast.present();
                toast.onDidDismiss(()=>{
                    // handle case to alert some data that he will standby notification that he is station owner
                    // then he may use the app as a user
                    this.storage.set('fulley_station_registered',true)
                    this.events.publish('full_station_registered',true );
                    this.storage.set("fulley_type",res.data.type) // station
                   this.navCtrl.setRoot('AuthPage')
                })
              }else{
                this.loading.dismiss()
                const toast = this.toastCtrl.create({
                  message: res.msg,
                  duration: 3000
                });
                toast.present();
              }
            },(err:any)=>{
              this.loading.dismiss()
            })
  }
  getfile_avatar(event){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.avatar = reader.result;

      reader.readAsDataURL(file);
  }

    this.choose_avatar=true

    console.log(event.target)
    console.log( event.target.files[0].name)
    var options = {};
    let body = new FormData();
    body.append('img',event.target.files[0]);
    this.loading=this.loadingCtrl.create({})
    this.loading.present()
    this.httpc.post('http://myfuelly.com/api/v1/uploadFile',body, options).subscribe(
      (res:any)=>{
        this.choosefile4=true
        this.loading.dismiss()
        if(res.status==true){
          this.myForm.value.OwnerShip=""
          console.log("OwnerShip  :"+res.data)
          this.myfile_avatar=res.data
          this.file_Avatar=event.target.files[0].name
        }
      },
      (err:any)=>{
        this.loading.dismiss()
      })
  }
  getfile1(event){
    this.file11=   event.target.files[0].name
    console.log(event.target)
    console.log( event.target.files[0].name)
    var options = {};
    let body = new FormData();
    body.append('img',event.target.files[0]);
    this.loading=this.loadingCtrl.create({})
    this.loading.present()
    this.httpc.post('http://myfuelly.com/api/v1/uploadFile',body, options).subscribe(
      (res:any)=>{
        this.choosefile1=true
        this.loading.dismiss()
        if(res.status==true){
          this.myForm.value.OwnerShip=""
          console.log("OwnerShip  :"+res.data)
          this.myfile1=res.data
          this.file11=event.target.files[0].name

        }
      },
      (err:any)=>{
        this.loading.dismiss()
      })
  }


  getfile2(event){
    this.file12=   event.target.files[0].name
    console.log(event.target)
    console.log( event.target.files[0].name)
    var options = {};
    let body = new FormData();
    body.append('img',event.target.files[0]);
    this.loading=this.loadingCtrl.create({})
    this.loading.present()
    this.httpc.post('http://myfuelly.com/api/v1/uploadFile',body, options).subscribe(
      (res:any)=>{
        this.choosefile2=true
        this.loading.dismiss()
        if(res.status==true){
          this.myForm.value.Commercial_License=""
          this.myfile2=res.data
         // this.file12=document.getElementById('file2')
          this.file12=event.target.files[0].name
        }
      },
      (err:any)=>{
        this.loading.dismiss()
      })
  }

  getfile3(event){
  this.file13=   event.target.files[0].name

    console.log(event.target)
    console.log( event.target.files[0].name)
    var options = {};
    let body = new FormData();
    body.append('img',event.target.files[0]);
    this.loading=this.loadingCtrl.create({})
    this.loading.present()
    this.httpc.post('http://myfuelly.com/api/v1/uploadFile',body, options).subscribe(
      (res:any)=>{
        this.choosefile3=true
        this.loading.dismiss()
        if(res.status==true){
          this.myForm.value.NationalID=""
          console.log("NationalID    :"+res.data)
          this.myfile3=res.data
         // this.file13=document.getElementById('file3')
          this.file13=event.target.files[0].name
        }
      },
      (err:any)=>{
        this.loading.dismiss()
      })
  }
}
