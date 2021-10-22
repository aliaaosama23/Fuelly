import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-station-details',
  templateUrl: 'station-details.html',
})
export class StationDetailsPage {
  order_id:any
  products:any[]=[]
  station_id:any
  stationDetails:any={}
  avatar:any=""
  worktime:any
  holidays:any
  lat:any
  lang:any
  constructor(public loadingCtrl:LoadingController, private storage: Storage,
    public translate: TranslateService,public modalCtrl: ModalController,
    public service:MainserviceProvider, public viewCtrl:ViewController,
     public navCtrl: NavController, public navParams: NavParams) {
   // call api to get staion details by station id
   console.log(this.navParams.get('id'))
   this.storage.get('fulley_user_token').then((val)=>{
     if(val){
       let loading=this.loadingCtrl.create({})
       loading.present()
      this.service.profile( val,this.navParams.get('id')).subscribe(
        (res:any)=>{
          loading.dismiss()
          if(res.status){
            this.stationDetails=res.data
            this.lat=res.data.lat
            this.lang=res.data.lang
            this.avatar="http://myfuelly.com/public/uploads/"+this.stationDetails.avatar

            this.products=res.data.services
            if(this.stationDetails.worktime==null){
              this.worktime=this.translate.instant("not exist")
            }else{
              this.worktime=this.stationDetails.worktime
            }
            if(this.stationDetails.holidays==null){
              this.holidays=this.translate.instant("not exist")
            }else{
              this.holidays=this.stationDetails.holidays
            }
          }
        },
        (err:any)=>{
          loading.dismiss()
        })
     }
   })

  }

  doRefresh(refresher){
    //
    this.storage.get('fulley_user_token').then((val)=>{
      if(val){
       this.service.profile( val,this.navParams.get('id')).subscribe(
         (res:any)=>{
          refresher.complete();
           if(res.status){
             this.stationDetails=res.data
             this.avatar="http://myfuelly.com/public/uploads/"+this.stationDetails.avatar

             this.products=res.data.services
             if(this.stationDetails.worktime==null){
               this.worktime=this.translate.instant("not exist")
             }else{
               this.worktime=this.stationDetails.worktime
             }
             if(this.stationDetails.holidays==null){
               this.holidays=this.translate.instant("not exist")
             }else{
               this.holidays=this.stationDetails.holidays
             }
           }
         },
         (err:any)=>{
          refresher.complete();
         })
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StationDetailsPage');
  }
  addOrder(service_id,priceperliter,type){
   console.log("add")
    const modal = this.modalCtrl.create('AddRequestPage',{'stationID':this.stationDetails.id, 'id':service_id,'priceperliter':priceperliter,'type':type});
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
           console.log("profile   res   :"+JSON.stringify(res))
            if(res.status){
                this.navCtrl.push('ShowMapPage',{'lat':parseFloat( res.data.lat),'long':parseFloat(res.data.lang),'info':this.stationDetails.name })
            }
          }
       )}
        })
  }
}





