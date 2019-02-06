import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPostPage } from './add-post';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AddPostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPostPage),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAguDUazRdMFvf51qFL54ysppW3gsOAXRw"
    })
  ],
})
export class AddPostPageModule {}
