import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
@IonicPage()
@Component({
  selector: 'page-choose-type',
  templateUrl: 'choose-type.html',
})
export class ChooseTypePage {
  isselected:boolean=false;
  isselected1:boolean=false;
  constructor( public menuCtrl:MenuController,public translate: TranslateService,private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseTypePage');
  }


  choose(type,status1,status2){
      console.log("current type.."+ type)
    this.isselected=status1
    this.isselected1=status2
      if(type=='user'){
        this.navCtrl.push('LoginPage')
        this.storage.set('full_type','user')
      }else if(type=='station'){
        // gp here to choose if he is owner or worker
      this.navCtrl.push('AuthPage')
      }
  }


}
