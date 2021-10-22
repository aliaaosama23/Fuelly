import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultsPage } from './search-results';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    SearchResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchResultsPage),
    TranslateModule.forChild()
  ],
})
export class SearchResultsPageModule {}
