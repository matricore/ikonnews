import { NgModule } from '@angular/core';
import { News } from './news';

@NgModule({
  declarations: [
    News,
  ],

  exports: [
    News
  ]
})
export class NewsModule {}
