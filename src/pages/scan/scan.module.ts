import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanPage } from './scan';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ScanPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanPage),
    TranslateModule.forChild()

  ],
})
export class ScanPageModule {}
