import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferDetailsPage } from './offer-details';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    OfferDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferDetailsPage),
    TranslateModule.forChild(),
    StarRatingModule
  ],
})
export class OfferDetailsPageModule {}
