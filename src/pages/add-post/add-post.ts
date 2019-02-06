import { Component ,Injectable} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Post } from '../../Models/Post.interface';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database'
import { PostLocation } from '../../Models/PostLocation';
import {FirebaseApp} from 'angularfire2'

import {Geolocation} from '@ionic-native/geolocation';
import { Camera ,CameraOptions } from '@ionic-native/camera';
import {storage, User} from 'firebase';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  post_object={}as Post;
  postRefernce:FirebaseListObservable<Post[]>;
  UsersR:FirebaseListObservable<User[]>;


  baseLocation:PostLocation = new PostLocation(29.866866,31.315270);
  locationSet=false;

  base64Image:any;

  posts_list:Post[];
  Current_photo:any;

  imageSource;
     constructor(public navCtrl: NavController,public fapp:FirebaseApp, public navParams: NavParams ,private DB:AngularFireDatabase , private modalCtrl:ModalController,private geoloc:Geolocation,private loadCtrl:LoadingController,private camera:Camera, public fbAuth:AngularFireAuth) 
     {
       this.UsersR=this.DB.list('Users');
     }

     ionViewDidLoad() {

  
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
     for(let i=0;i<1000;i++)
     {
       
     }
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
     this.post_object.post_imge=this.post_object.post_title;
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
      this.post_object.post_imge=this.post_object.post_title;
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
      .child('images/'+this.post_object.post_imge+'.jpg').put(this.base64Image);
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
    firebase.storage().ref().child('images/'+this.post_object.post_imge+'.jpg').getDownloadURL().
    then((url)=>{
  
     this.imageSource=url;   
    })
  }

  AddPost()
  {
    this.fbAuth.authState.take(1).subscribe(auth => {
    this.DB.list(`Users/${auth.uid}/MyPosts`).push(this.post_object)})
   this.navCtrl.pop();
   this.upload();
  }

  Cancel()
  {
    this.navCtrl.pop();
  }

}
