import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Users } from '../../Models/users';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Post } from '../../Models/Post.interface';
@IonicPage()
@Component({
  selector: 'page-fllow-user',
  templateUrl: 'fllow-user.html',
})
export class FllowUserPage {
  postRefernce:FirebaseListObservable<Post[]>;
  posts_list:Post[];
  User_Object={} as Users;
  constructor(public navCtrl: NavController, public navParams: NavParams,private AngFireAuth:AngularFireAuth, private db:AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FllowUserPage');
  }


}
