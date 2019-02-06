import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { Users } from '../../models/users';
import {AngularFireDatabase , FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


import { Component ,Injectable} from '@angular/core';
import { PostLocation } from '../../Models/PostLocation';
import {Geolocation} from '@ionic-native/geolocation';
import {storage, User} from 'firebase';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-info',
  templateUrl: 'add-info.html',
})
export class AddInfoPage {
  authForm : FormGroup;
  Name: AbstractControl;
  Age: AbstractControl;
  Adress:AbstractControl;
  UserRef : FirebaseListObservable<Users[]>;
  CurrentUser = {} as Users;
  imagepath:string='';

  baseLocation:PostLocation = new PostLocation(29.866866,31.315270);
  locationSet=false;

  base64Image:any;

 // posts_list:Post[];
  Current_photo:any;

  imageSource;
  constructor(public navCtrl: NavController,private camera:Camera,private modalCtrl:ModalController,public LdgCtrl : LoadingController,private geoloc:Geolocation,private loadCtrl:LoadingController,public fireAuth : AngularFireAuth ,public db : AngularFireDatabase,  public navParams: NavParams, private Camera:Camera,private toastCtrl:ToastController,public fb: FormBuilder) {
    this.UserRef = this.db.list('Users');
    this.authForm = this.fb.group({
      
      'Name': [null, Validators.compose([Validators.required])],
      'Age': [null, Validators.compose([Validators.required])],
      'Adress':[null, Validators.compose([Validators.required])],
      
      
  });
  this.Name = this.authForm.controls['Name'];
  this.Age = this.authForm.controls['Age'];
  this.Adress =this.authForm.controls['Adress'];
  }

  getLocation()
  {
    const loading=this.loadCtrl.create({
      content:'Fetching Your Location...',
    })
    loading.present();
   this.geoloc.getCurrentPosition()
   .then((locationdata)=>{
     this.baseLocation.latitude=locationdata.coords.latitude;
     this.baseLocation.longtuide=locationdata.coords.longitude;
     this.locationSet=true;
     loading.dismiss();
  
   })
   .catch((error)=>{
     console.log("Error : "+error);
   });
  }

    setMap()
  {
    const modal=this.modalCtrl.create('SetLocationPage');
    modal.present();
    modal.onDidDismiss((data)=>{
     if(data)
     {
       this.baseLocation=data;
       this.locationSet=true;
     }
    });
  }

  async useCamera()
  {
   
    const options: CameraOptions = {
      quality: 100,
      targetHeight:200,
      targetWidth:200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.base64Image =this.dataUrlToBlob('data:image/jpeg;base64,' + imageData);

     this.Current_photo='data:image/jpeg;base64,' + imageData;
     this.CurrentUser.userimage=this.CurrentUser.Name;
     }, (err) => {
      console.log(err);
     });
    
  }

  dataUrlToBlob(photoUrl)
  {
    let Binary = atob(photoUrl.split(',')[1]);
    let array =[];
    for(var index=0;index< array.length;index++)
    {
      array.push(Binary.charCodeAt(index));
    }
    return new Blob([new Uint8Array(array)],{type : 'image/jpeg'});
  }

  openGallery()
  {
    const options: CameraOptions = {
      quality: 100,
      targetHeight:600,
      targetWidth:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image =this.dataUrlToBlob('data:image/jpeg;base64,' + imageData);

      this.Current_photo = 'data:image/jpeg;base64,' + imageData;
      const pictures = storage().ref('pictures');
      this.CurrentUser.userimage=this.CurrentUser.Name;
      pictures.putString(this.Current_photo, 'data-url')
     }, (err) => {
      // Handle error
     });

  }

  upload()
  {
    if(this.base64Image)
    {
      var uploadTask=firebase.storage().ref()
      .child('images/'+this.CurrentUser.userimage+'.jpg').put(this.base64Image);
      uploadTask.then(this.onSuccess,this.onError);
    }
  }

  onError=(snapshot)=>{

    console.log(snapshot);
  
  };

  onSuccess=(snapshot)=>
  {
   this.Current_photo = snapshot.downloadURL;
  
  }

  getMyURL()
  {
    firebase.storage().ref().child('images/'+this.CurrentUser.userimage+'.jpg').getDownloadURL().
    then((url)=>{
  
     this.imageSource=url;   
    })
  }




  goHome(){



    const Loading = this.LdgCtrl.create({
      content : 'saving Data......'
    });

    this.fireAuth.authState.take(1).subscribe(auth => {
      this.db.object(`Users/${auth.uid}/ProfileDetails`).set(this.CurrentUser)
    });
    var userId = this.fireAuth.auth.currentUser.uid;
    //this.CurrentUser.$key=userId;
    
   // this.db.list(`UsersNames`).push(this.CurrentUser)

        this.fireAuth.authState.take(1).subscribe(auth => {
        this.db.object(`UsersNames/${auth.uid}`).set(this.CurrentUser)
        this.db.object(`UsersNames/${auth.uid}/userid`).set(userId)

    });
  }
}