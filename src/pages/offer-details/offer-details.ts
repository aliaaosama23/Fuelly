import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-offer-details',
  templateUrl: 'offer-details.html',
})
export class OfferDetailsPage {

  order_id:any
  products:any[]=[]
  station_id:any
  offerDetails:any={}
  stationDetails:any={}
  avatar:any=""
  worktime:any
  holidays:any
  lat:any
  lang:any
  rating:number=0
  constructor(public loadingCtrl:LoadingController, private storage: Storage,
              public translate: TranslateService,public modalCtrl: ModalController,
              public service:MainserviceProvider, public viewCtrl:ViewController,
              public navCtrl: NavController, public navParams: NavParams) {

                  console.log("offer details   :"+ JSON.stringify(this.navParams.get('id')))
                  let loading=this.loadingCtrl.create({})
                  loading.present()
                  this.service.offerDetails(this.navParams.get('id'))
                  .subscribe(
                    (res:any)=>{
                      loading.dismiss()
                   if(res.status){
                    this.offerDetails=res.data
                    console.log("00"+JSON.stringify(res.data.user.name))
                    this.avatar="http://myfuelly.com/public/uploads/"+this.offerDetails.img
                    if(this.offerDetails.user.worktime==null){
                      this.worktime=this.translate.instant("not exist")
                    }else{
                      this.worktime=this.offerDetails.user.worktime
                    }
                    if(this.offerDetails.user.holidays==null){
                      this.holidays=this.translate.instant("not exist")
                    }else{
                      this.holidays=this.offerDetails.user.holidays
                    }
                   }
                    },(err:any)=>{
                      loading.dismiss()
                    }
                  )

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferDetailsPage');
  }

  addOrder(service_id,priceperliter,type){
    console.log("add")
     const modal = this.modalCtrl.create('AddRequestPage',{'stationID':this.offerDetails.id, 'id':service_id,'priceperliter':priceperliter,'type':type});
     modal.present();
   }



   back(){
    this.viewCtrl.dismiss()
   }

   showMap(){
     // open map on the location of station
     this.storage.get('fulley_user_token').then((val)=>{
       if(val){
        this.service.profile( val,this.navParams.get('id')).subscribe(
          (res:any={})=>{
             if(res.status){
                 this.navCtrl.push('ShowMapPage',{'lat':parseFloat( res.data.lat),'long':parseFloat(res.data.lang) })
             }
           }
        )}
         })
   }

   doRefresh($event){

   }
}
