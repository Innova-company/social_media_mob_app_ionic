import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Users } from '../../models/users';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase'
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  userData : FirebaseObjectObservable<Users>;


  
  constructor(public navCtrl: NavController,private db : AngularFireDatabase,private fire : AngularFireAuth, public navParams: NavParams ) {

  }


  ionViewWillLoad(){
    
    this.fire.authState.take(1).subscribe(data=>{
        this.userData = this.db.object(`Users/${data.uid}/ProfileDetails`);
      

      
    })
    
  

    /*
    firebase.database().ref().child("Users").on('value', function(snapshot) {
    snapshot.forEach(function(child) {
    var datas = child.val();
    var name=child.val().Name;
    var age=child.val().Age;

      var userId = this.fire.auth.currentUser.uid;
    return this.db.database.ref(`/Users/${userId}/Name/`).once('value').then(function(snapshot){
    var Name = (snapshot.val() && snapshot.val().Name) || 'Anoynymous';
     */
    
     
  }


  
  signout(){
 
  }

}
