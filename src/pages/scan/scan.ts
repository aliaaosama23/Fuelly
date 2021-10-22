import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, Events } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {  TranslateService } from '@ngx-translate/core';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  orderDetails:any
  chargeBefore:boolean=false
dataScanned:any={
  cancelled: false,
    format: "",
    text: ""
}
  constructor(public toastCtrl:ToastController, public service:MainserviceProvider,
    public menuCtrl:MenuController,public  translate: TranslateService,public events:Events,
    private barcodeScanner: BarcodeScanner,public navCtrl: NavController, public navParams: NavParams) {
      this.events.subscribe('logined',(val)=>{
        this.menuCtrl.enable(true)
      })
    }

    Menu(){
      this.menuCtrl.toggle()
    }
  ionViewDidLoad() {

    console.log('ionViewDidLoad ScanPage');
  }

  ionViewWillEnter(){

  }


  scan(){
    let options:BarcodeScannerOptions	={
      'prompt':this.translate.instant("scan qr code")
    }

    this.barcodeScanner.scan(options)
    .then((barcodeData:any) => {
      console.log('Barcode data',JSON.stringify( barcodeData));
      this.dataScanned=barcodeData
      this.service.orderDetails(this.dataScanned.text).subscribe(
        (res:any)=>{
         console.log("orderDetails  res--------"+JSON.stringify(res))
          if(res.status){
            this.orderDetails=res.data
            this.showDetails()
          }
        },
        (err:any)=>{
          console.log("orderDetails  res--------"+JSON.stringify(err))
         }
      )
    }).catch(err => {
      console.log('Error', JSON.stringify(err));
  });
  }


  showDetails(){
   // call api to send scanned code to get its data
   if(this.orderDetails.status==1){
    this.chargeBefore=true
    const toast = this.toastCtrl.create({
      message:this.translate.instant("code charged before"),
      duration: 4000
    });
    toast.present();

  }else if(this.orderDetails.status==0){
    this.chargeBefore=false
    this.navCtrl.push('BillPage',{'codeData':this.dataScanned.text})
  }
}
}
