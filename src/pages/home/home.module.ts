import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { StarRatingModule } from 'ionic3-star-rating';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    StarRatingModule
  ],
})
export class HomePageModule {}
