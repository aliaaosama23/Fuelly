import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePasswordPage } from './update-password';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UpdatePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePasswordPage),
    TranslateModule.forChild()  ],
})
export class UpdatePasswordPageModule {}
