import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseTypePage } from './choose-type';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ChooseTypePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseTypePage),
    TranslateModule.forChild()
  ],
})
export class ChooseTypePageModule {}
