import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {
  searchtext:any
  searchResults:any[]=[]
  constructor(public loadingCtrl:LoadingController,  public viewCtrl:ViewController,
     public service:MainserviceProvider,public  translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
   this.searchtext=this.navParams.get('searchtext')
   let loading=this.loadingCtrl.create({
    content: this.translate.instant("searching")
   })
   loading.present()
   this.service.search(this.searchtext).subscribe(
      (res:any)=>{
       loading.dismiss()
         console.log("search service result    :"+JSON.stringify(res))
          if(res.status){
            this.searchResults=res.data
          }
      },(err:any)=>{
        loading.dismiss()
        console.log("search service err    :"+JSON.stringify(err))
      }
   )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultsPage');
  }

  stationDetails(stationId){
    this.navCtrl.push('StationDetailsPage',{'id':stationId})
  }

  back(){
   this.viewCtrl.dismiss()
  }
}
