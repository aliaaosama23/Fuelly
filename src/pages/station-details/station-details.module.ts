import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationDetailsPage } from './station-details';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    StationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StationDetailsPage),
    TranslateModule.forChild(),
    StarRatingModule
  ],
})
export class StationDetailsPageModule {}
