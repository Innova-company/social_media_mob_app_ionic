import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Users } from '../../Models/users';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  UsersRef : FirebaseListObservable<Users[]>;
  followList : Users[];
  //postRefernce:FirebaseListObservable<Post[]>;
  //posts_list:Post[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public AngFireAuth : AngularFireAuth , public db : AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.AngFireAuth.authState.take(1).subscribe(data=>{
      this.UsersRef = this.db.list(`Users/${data.uid}/makeFollowUser`);
      this.UsersRef.subscribe((ids)=>{
        this.followList=ids;
        console.log(this.followList);
     
         });
    })

  }

}
