import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database'
import { Post } from '../../Models/Post.interface';


@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {


  post_object={}as Post;
  postRefernce:FirebaseObjectObservable<Post>;
  
     constructor(public navCtrl: NavController, public navParams: NavParams ,private DB:AngularFireDatabase) 
     {
       this.post_object=this.navParams.data;
       this.postRefernce=this.DB.object('Posts/'+this.post_object.$key);
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');
  }
  EditPost()
  {
    this.postRefernce.update(this.post_object);
    this.navCtrl.pop();
  }

}
