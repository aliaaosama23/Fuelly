import { Component } from '@angular/core';
import { IonicPage,Events, NavController, NavParams, MenuClose, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  isselected:boolean=false;
  isselected1:boolean=false;
  role:any
  Owner:boolean=false
  constructor(public menuCtrl:MenuController, public events: Events,public translate: TranslateService,  private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false)
    this.role=this.navParams.get('role')
    this.storage.get('full_station_registered').then(val=>{
     // alert(val)
      if(val==null){
        this.Owner=false
      }else{
        this.Owner=true
      }
    })

    events.subscribe('full_station_registered', (val) => {
      console.log('full_station_registered    :'+ val);
      if(val==true){
        this.Owner=val
      }
       else{
         this.Owner=false
       }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseTypePage');
  }

  choose(type,status1,status2){
    console.log("current type.."+ type)

   this.isselected=status1
   this.isselected1=status2

    if(type=='owner'){
      this.navCtrl.push('ApplicationFormPage');
      this.storage.set('full_type','owner')
    }else if(type='worker'){
      this.navCtrl.push('LoginPage',{'comefrom':'worker'});
      this.storage.set('full_type','worker')
    }
    }

}
