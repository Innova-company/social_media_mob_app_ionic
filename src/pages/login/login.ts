import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController,ToastController,ActionSheetController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userMail:string ='';
  userPassword:string ='';
  authForm : FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  passwordtype:string='password';
  
  splash= true ;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireAuth,public alert:AlertController,public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController,public fb: FormBuilder) {

   
    this.authForm = this.fb.group({
      
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      
      
  });
  this.email = this.authForm.controls['email'];
  this.password = this.authForm.controls['email'];
  }


  login(){

    this.db.auth.signInWithEmailAndPassword(this.userMail,this.userPassword).then(
      user=>{
        let toast = this.toastCtrl.create({
          message: 'Logged IN successfully',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.setRoot(TabsPage)
      });
  }  

  loginWithGoogle(){
    this.db.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      user=>{
        let toast = this.toastCtrl.create({
          message: 'Logged IN successfully',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      this.navCtrl.setRoot(TabsPage)
    }
      );
  }

  gosignup(){
   this.navCtrl.push(SignupPage)
 }

 ionViewDidLoad() {
  setTimeout(() => this.splash = false, 4000);
}

}
