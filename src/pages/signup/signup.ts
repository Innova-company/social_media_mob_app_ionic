import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,ToastController, ActionSheetController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { AddInfoPage } from '../add-info/add-info';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  regData = { mail: '', pass: '' };
  authForm : FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  passwordtype:string='password';
  passeye:string ='eye';
  cnfpasswordtype:string='password';
  cnfpass: AbstractControl;
  cnfpasseye:string='eye';
  constructor(public navCtrl: NavController, public fire:AngularFireAuth,public alertCtrl:AlertController, public actionSheetCtrl: ActionSheetController,public toastCtrl: ToastController,public fb: FormBuilder) {

    this.authForm = this.fb.group({
      
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'cnfpass': [null, Validators.compose([Validators.required])]
      
  });
  
  
  this.email = this.authForm.controls['email'];
  this.password = this.authForm.controls['password'];
  this.cnfpass = this.authForm.controls['cnfpass'];
  }

  doRegister(regData){
  	if(regData.pass == regData.cnfpass){
     
        this.fire.auth.createUserWithEmailAndPassword(regData.mail,regData.pass)
        let toast = this.toastCtrl.create({
          message: 'User was added successfully',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.setRoot(LoginPage)
    }
    else {
      let toast = this.toastCtrl.create({
        message: 'Please Enter Valid Pssword',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    
  }

  managePassword() {
    if(this.passwordtype == 'password'){
      this.passwordtype='text';
      this.passeye='eye-off';
    }else{
      this.passwordtype='password';
      this.passeye = 'eye';
    }
  }
  managecnfPassword() {
    if(this.cnfpasswordtype == 'password'){
      this.cnfpasswordtype='text';
      this.cnfpasseye='eye-off';
    }else{
      this.cnfpasswordtype='password';
      this.cnfpasseye = 'eye';
    }
  }

}