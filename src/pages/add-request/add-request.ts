import { Component } from '@angular/core';
import { IonicPage,ToastController,LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequestPage {
  noofliters:number=0
  priceperliter:number=0
  type:any
  constructor( public toastCtrl: ToastController,private storage: Storage,
    private iab: InAppBrowser,public loadingCtrl:LoadingController,
    public service:MainserviceProvider,
    public  translate: TranslateService,public viewCtrl:ViewController,
     public navCtrl: NavController, public navParams: NavParams) {

        this.priceperliter=this.navParams.get('priceperliter')
        console.log("price   :"+this.priceperliter)
        this.type=this.navParams.get('type')
        console.log("type   :"+this.type)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRequestPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  goPay(){
    if(this.noofliters==0){
      const toast = this.toastCtrl.create({
        message: this.translate.instant("select liters number"),
        duration: 3000
      });
      toast.present();
    }else{
      this.storage.get('fulley_user_token').then(val=>{
        let loading=this.loadingCtrl.create({})
        loading.present()
        this.service.addOrder(this.navParams.get('stationID'),this.navParams.get('id'),this.noofliters * this.priceperliter,this.noofliters,val).subscribe(
          (res:any)=>{
            loading.dismiss()
            if(res.status){

                  // toast.onDidDismiss(()=>{
                    const browser= this.iab.create(res.paypal_link,'_blank','location=yes');
                    browser.on('loadstop').subscribe((event:any) => {
                      if(event.type=="loadstop"){
                        const toast = this.toastCtrl.create({
                          message: this.translate.instant("new order added"),
                          duration: 6000
                        });
                        toast.present();
                        toast.onDidDismiss(()=>{
                          this.viewCtrl.dismiss()
                        })
                      }
                   });
                 // })

            }else{
              const toast = this.toastCtrl.create({
                message: this.translate.instant("ActivateYourAccount"),
                duration: 3000
              });
              toast.present();
            }

          }, (err:any)=>{
            loading.dismiss()
          }

        )
      })
    }

  }

  increase(){
    this.noofliters++
  }

  decrease(){
    if(this.noofliters>0){
      this.noofliters--
    }
  }

}
