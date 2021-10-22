import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController,NavParams, LoadingController, MenuController, ToastController, Events } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  token:any
rate:number=0
  offers:any[]=[]
  stations:any[]=[]
  searchText:string
  constructor(public toastCtrl: ToastController,public menuCtrl:MenuController,
     public modalCtrl: ModalController,public  translate: TranslateService,public events:Events,
     public loadingCtrl:LoadingController, private storage: Storage,
     public service:MainserviceProvider, public navCtrl: NavController,
      public navParams: NavParams) {
       // this.events.subscribe('logined',(val)=>{
        //  console.log("event  :"+val)
          this.menuCtrl.enable(true)
       // })
    // call api to get offers and stations near by the user

    this.rate=3
    this.storage.get('fulley_user_token').then((val)=>{
      let loading=this.loadingCtrl.create({})
      loading.present()
      this.service.home(val).subscribe(
        (res:any)=>{
          loading.dismiss()
            this.offers=res.data.offers
            this.stations=res.data.stations
        },(err:any)=>{
          loading.dismiss()
        }
      )
    })

  }

  offerDetails(offer_id){
    this.navCtrl.push('OfferDetailsPage',{'id':offer_id})
  }

  ionViewDidLoad() {
   // this.events.subscribe('logined',(val)=>{
    // console.log("event  :"+val)
      this.menuCtrl.enable(true)
   // })
    console.log('ionViewDidLoad HomePage');
  }
  ionViewDidEnter(){
   // this.events.subscribe('logined',(val)=>{
    //  console.log("event  :"+val)
      this.menuCtrl.enable(true)
   // })
  }

  search(){
    if(this.searchText==''){
      const toast = this.toastCtrl.create({
        message: this.translate.instant("enter saerch text"),
        duration: 3000
      });
      toast.present();
    }else{
      const modal = this.modalCtrl.create('SearchResultsPage',{'searchtext':this.searchText});
      modal.present();
    }
  }

  stationDetails(stationId){
    this.navCtrl.push('StationDetailsPage',{'id':stationId})
  }

  myRequests(){
    this.navCtrl.push('RequestsPage')
  }

  doRefresh(refresher){
    this.rate=3
    this.storage.get('fulley_user_token').then((val)=>{
      this.service.home(val).subscribe(
        (res:any)=>{
          refresher.complete();
            this.offers=res.data.offers
            this.stations=res.data.stations

        },(err:any)=>{
          refresher.complete();
        }
      )
    })
  }


  Menu(){
    console.log("pppp")
   this.menuCtrl.toggle()
  }
}
