import { Component ,ViewChild} from '@angular/core';
import { Nav,Platform, MenuController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { HelperProvider } from '../providers/helper/helper';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  type:string=''
  rootPage:string;
  appUrl:any=""
  lang:string=''
  pagesuser: Array<{title: string, component: any,name:any}>;
  pagesworker: Array<{title: string, component: any,name:any}>;
  constructor( public menuCtrl:MenuController,public alertCtrl:AlertController,
    private socialSharing: SocialSharing,public events:Events,
               public helper:HelperProvider, private geolocation: Geolocation,
                public  translate: TranslateService,private storage: Storage,public  platform: Platform,
                statusBar: StatusBar, splashScreen: SplashScreen) {

      platform.ready().then(() => {
        this.events.subscribe('logined',(val)=>{
          this.type=val
        })
        // used for an example of ngFor and navigation
        this.pagesuser = [
          {title:"home",component:'HomePage',name:'Home'},
          {title:"MyOrders",component:"RequestsPage",name:'Requests'},
          {title:"Profile",component:'ProfilePage',name:'Profile'},
          {title:"AboutApp",component:'AboutPage',name:'About'},
          {title:"ShareApp",component:'',name:'share'},
          {title:"Logout",component:'',name:'logout'},
        ];

        this.pagesworker = [
          {title:"home",component:'HomePage',name:'Home'},
          {title: "passwordChange",component:'UpdatePasswordPage',name:'UpdatePassword'},
          {title:"AboutApp",component:'AboutPage',name:'About'},
          {title:"ShareApp",component:'',name:'share'},
          {title:"Logout",component:'',name:'logout'},
        ];

        this.storage.get('Fulleylanguage').then((val:any)=>{
          console.log("lang   :"+val)
          if(val!=null){
            if(val=='ar'){
              this.translate.use('ar')
             this. translate.setDefaultLang('ar')
              this.platform.setDir('rtl',true)
              this.helper.set_language('ar')
              this.lang='ar'
            }else{
             this. translate.use('en')
             this. translate.setDefaultLang('en')
              this.platform.setDir('rtl',true)
              this.helper.set_language('en')
              this.lang='en'
            }
          }else{
            this.translate.use('ar')
             this. translate.setDefaultLang('ar')
              this.platform.setDir('rtl',true)
              this.helper.set_language('ar')
              this.lang='ar'
          }
        })
        this.storage.get('fulley_user_logined').then((val1:any)=>{
          if(val1!=null){
             this.rootPage='HomePage'
             this.type="user"

          }else{
            this.storage.get('fulley_worker_logined').then((val2:any)=>{
              if(val2!=null){
                 this.rootPage='ScanPage'
                 this.type="worker"

              }else{
                     this.rootPage='ChooseTypePage'
              }
            })

          }
        })
          this.geolocation.getCurrentPosition().then((resp) => {
             this.helper.set_lattiude(resp.coords.latitude)
             this.helper.set_longitude(resp.coords.longitude)
            console.log("lat   :"+resp.coords.latitude +"lang   :"+resp.coords.longitude)
           }).catch((error) => {
           });

      // this.storage.get('full_type').then((val)=>{
      //   console.log('current type...'+val)
      // })
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.name=='share'){
      if(this.platform.is('ios')){
        this.appUrl="https://itunes.apple.com/us/app/?ls=1&mt=8";
      }
      else{
        this.appUrl="https://play.google.com/store/apps/details?id=com.fuelly.fuelly";
      }
            this.socialSharing.share("fuelly app",'','',this.appUrl)
    }else if(page.name=='logout'){
        this.translate.get("logout").subscribe(
          value => {
          this.translate.get("yes").subscribe(
              value1 => {
                this.translate.get("no").subscribe(
                  value2 => {
              const alert = this.alertCtrl.create({
                subTitle: value,
                buttons: [
                  {
                    text:  value2,
                    role: 'cancel',
                    handler: () => {
                    }
                  },
                  {
                    text: value1,
                    handler: () => {
                      // call api to log out and unregister from receive notification
                      this.storage.clear();
                      this.nav.setRoot('ChooseTypePage')
                  }
                  }
                ]
              });
              alert.present();
            })
          })
        })

    }else if(page.name=='Home'){
      this.nav.setRoot(page.component)
    }else{
      this.nav.push(page.component);
    }

  }

  close(){
    this.menuCtrl.close()
  }
}

