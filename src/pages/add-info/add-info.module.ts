import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInfoPage } from './add-info';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AddInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInfoPage),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAguDUazRdMFvf51qFL54ysppW3gsOAXRw"
    })
  ],
})
export class AddInfoPageModule {}
