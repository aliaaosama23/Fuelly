import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCodePage } from './order-code';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderCodePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCodePage),
    TranslateModule.forChild()
  ],
})
export class OrderCodePageModule {}
