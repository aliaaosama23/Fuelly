import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MainserviceProvider } from '../providers/mainservice/mainservice';
import { HelperProvider } from '../providers/helper/helper';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { StarRatingModule } from 'ionic3-star-rating';
import { InAppBrowser } from '@ionic-native/in-app-browser';

//import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    StarRatingModule ,
    TranslateModule.forRoot(),
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }),
      TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,File,SocialSharing,BarcodeScanner,Geolocation, InAppBrowser,
    //PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MainserviceProvider,
    HelperProvider
  ]
})
export class AppModule {}
