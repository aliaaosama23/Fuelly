import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {
  myOrders:any[]=[]
  requestType:string=""
  currentRequests:any[]=[]
  closedRequests:any[]=[]
  constructor(public loadingCtrl:LoadingController, private storage: Storage,
              public service:MainserviceProvider,public translate: TranslateService,
              private viewCtrl:ViewController, public navCtrl: NavController,
              public navParams: NavParams) {
                 this.requestType="current"
                this.storage.get('fulley_user_token').then((val:any)=>{
                    let loading=this.loadingCtrl.create({})
                    loading.present()
                      this.service.myOrders(val).subscribe(
                        (res:any)=>{
                          loading.dismiss()
                          if(res.status){
                           this.myOrders= res.data
                           this.myOrders.forEach(elem=>{

                              if(elem.status=="1"){
                               this.closedRequests.push(elem)
                              }
                            })
                            this.myOrders.forEach(elem=>{
                               if(elem.status=="0"){
                                this.currentRequests.push(elem)
                               }
                            })
                          }
                        },(err:any)=>{
                          loading.dismiss()
                        })
                })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
  }

  back(){
    this.viewCtrl.dismiss()
  }

  orderDetails(order_img){
    this.navCtrl.push('OrderCodePage',{'img':order_img})
  }

  doRefresh(refresher){
    this.requestType="current"
    this.storage.get('fulley_user_token').then((val:any)=>{
        this.service.myOrders(val).subscribe(
          (res:any)=>{
            refresher.complete();
            if(res.status){
              this.myOrders= res.data
              this.myOrders.forEach(elem=>{
                if(elem.status=="1"){
                 this.closedRequests.push(elem)
                }else if(elem.status=="0"){
                  this.currentRequests.push(elem)
                 }
              })
            }
          },(err:any)=>{
            refresher.complete();
          })
  })
  }
}
