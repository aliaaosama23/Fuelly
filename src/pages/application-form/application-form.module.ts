import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationFormPage } from './application-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ApplicationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicationFormPage),
    TranslateModule.forChild()
  ],
})
export class ApplicationFormPageModule {}
