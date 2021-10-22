import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams, MenuController, Platform, LoadingController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html',
})
export class BillPage {
 requestCode:any
 orderDetails:any={}
 chargeBefore:boolean=false
 dir:boolean
  constructor(public menuCtrl:MenuController, public toastCtrl: ToastController,
   public  translate: TranslateService,public service:MainserviceProvider,public platform:Platform,
      public navCtrl: NavController,public loadingCtrl:LoadingController,  public navParams: NavParams) {
        this.dir=this.platform.isRTL
    this.menuCtrl.enable(false)
       this.requestCode=this.navParams.get('codeData')
       let loading=this.loadingCtrl.create({})
       loading.present()
    this.service.orderDetails(this.navParams.get('codeData')).subscribe(
      (res:any)=>{
        loading.dismiss()
        if(res.status){
          this.orderDetails=res.data
        }
      },
      (err:any)=>{
        loading.dismiss()
       }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillPage');
  }

  fill(){
    this.service.acceptOrder(this.orderDetails.id).subscribe(
      (res:any)=>{
        if(res.status){
          const toast = this.toastCtrl.create({
            message:"تم التعبئة بنجاح وشحن الكود",
            duration: 3000
          });
          toast.present();
          toast.onDidDismiss(()=>{
             this.navCtrl.setRoot('ScanPage')
          })
        }
      },
      (err:any)=>{
      }
    )
  }
}
