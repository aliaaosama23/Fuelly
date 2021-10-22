import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillPage } from './bill';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BillPage,
  ],
  imports: [
    IonicPageModule.forChild(BillPage),
    TranslateModule.forChild()
  ],
})
export class BillPageModule {}
