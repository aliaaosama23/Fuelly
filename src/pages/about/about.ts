import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
about:any
  constructor(public loadingCtrl:LoadingController,public translate: TranslateService,
    public service:MainserviceProvider, public viewCtrl:ViewController,
     public navCtrl: NavController, public navParams: NavParams) {
  let loading=this.loadingCtrl.create({})
  loading.present()
    this.service.aboutus().subscribe(
      (res:any)=>{
        loading.dismiss()
            if(res.status){
              this.about=res.data.aboutus
            }
      },
      (err:any)=>{
        loading.dismiss()
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  back(){
   this.viewCtrl.dismiss()
  }
}
