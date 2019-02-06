import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Post } from '../../Models/Post.interface';


@IonicPage()
@Component({
  selector: 'page-my-posts',
  templateUrl: 'my-posts.html',
})
export class MyPostsPage {
  postRefernce:FirebaseListObservable<Post[]>;
  posts_list:Post[];


  constructor(public navCtrl: NavController, public navParams: NavParams ,private AngFireAuth:AngularFireAuth, private db:AngularFireDatabase) {
   // this.postRefernce=this.db.list('Posts');

  }

  ionViewDidLoad() {
    this.AngFireAuth.authState.take(1).subscribe(data=>{
      this.postRefernce = this.db.list(`Users/${data.uid}/MyPosts`);
      this.postRefernce.subscribe((post_item)=>{
        this.posts_list=post_item;
     
         });
    })

  }
}