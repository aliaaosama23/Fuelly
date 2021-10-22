import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-order-code',
  templateUrl: 'order-code.html',
})
export class OrderCodePage {
  img:any=""

  constructor(public  translate: TranslateService,private socialSharing: SocialSharing,
    public viewCtrl:ViewController, public navCtrl: NavController,
    public navParams: NavParams) {
    this.img=this.navParams.get('img')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCodePage');
  }
  share(){
    this.socialSharing.share("fuelly app order code :",'',"http://myfuelly.com/public/uploads/"+this.img,'')
  }
  back(){
    this.viewCtrl.dismiss()
  }

}
