import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { User, auth } from 'firebase';
import { Users } from '../../Models/users';
import { Post } from '../../Models/Post.interface';
import { FllowUserPage } from '../fllow-user/fllow-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {FCM} from '@ionic-native/fcm'
//import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-all-users',
  templateUrl: 'all-users.html',
})
export class AllUsersPage {

  userRefernce:FirebaseListObservable<Users[]>;
  postRefernce2:FirebaseListObservable<Post[]>;

  user_follow_Refernce:FirebaseListObservable<Users[]>;

  user_object={}as Users
  users_list:Users[];
  users_list2:any[];

  follow_user:FllowUserPage
  userData : FirebaseObjectObservable<Users>;
  cUser ={} as Users;
  UsersRef : FirebaseListObservable<Users[]>;
  UsersRef2 : FirebaseListObservable<Users[]>;

  followList : Users[];
  postRefernce:FirebaseListObservable<Post[]>;
  post_object={}as Post;
  posts_list:Post[];
  posts_user:Post[];


public UsersList:Array<any>;
public loadedUsersList:Array<any>;
public UsRef:firebase.database.Reference;

followd =true;
  constructor(public navCtrl: NavController,public fcm:FCM, public localNotification:LocalNotifications ,public navParams: NavParams, private toastCtrl : ToastController,private ActionSctrl:ActionSheetController ,private DB:AngularFireDatabase,public fire:AngularFireAuth) 
  {
    this.UsRef = firebase.database().ref('/UsersNames');


    this.UsRef.on('value', UsersList => {
      let userss = [];
      UsersList.forEach( user => {
        userss.push(user.val());
        return false;
      });
    
      this.UsersList = userss;
      this.loadedUsersList = userss;
    });
    
  /*  firebase.database().ref('Users')
  .once('value')
  .then(snapshot => {
     let users_list2:any
    snapshot.forEach(function(child) {
      
      console.log(child);
      users_list2=child.key
    });

     
  })*/

   this.UsersRef2=this.DB.list('UsersNames')
    this.UsersRef2.subscribe((item_user_id)=>{
      this.users_list2=item_user_id;


     // console.log(this.users_list);
   // var userId = this.fire.auth.currentUser.uid;


    })


    

    this.userRefernce=this.DB.list('Users')
    this.userRefernce.subscribe((item_user)=>{
      this.users_list=item_user;

      //var userId = this.fire.auth.currentUser.uid;
      //console.log(this.users_list2[0])
      //console.log(userId)
      /*for(let i=0;i<=this.users_list2.length;i++)
      {
        console.log(this.users_list2[i])
        console.log(userId)

  
        if(this.users_list2[i]!=userId)
        {
          this.users_list=item_user;
        }
        else{
          console.log(his.users_list)
        }
      }
      */
      //this.users_list=item_user;
    })
    
  }


  initializeItems(): void {
  this.UsersList = this.loadedUsersList;
}

disabledbtn(event)
{
  this.followd=false;
}
  

onItemClick(user,userid,userName)
{


  this.cUser.Name=user.Name;
  this.cUser.Age=user.Age;
  //this.cUser.$key=user2.$key;
  var userId = this.fire.auth.currentUser.uid;
  console.log(userid)
   this.fire.authState.take(1).subscribe(auth => {
   this.DB.list(`Users/${userId}/makeFollowUser`).push(this.cUser)});

   this.fire.authState.take(1).subscribe(auth => {
    this.DB.list(`Users/${userId}/makeFollowUserwithID/`).push(userid)});

  //this.UsersRef2=this.DB.list(`Users/${userId}/makeFollowUser`);

   //this.DB.list(`Users/${userId}/makeFollowUser/followUserId`).push(this.cUser.$key)});
   


   this.postRefernce2 = this.DB.list(`Users/`+userid+`/MyPosts`);
   this.postRefernce2.subscribe((post_item)=>{
   this.posts_user=post_item; 
   console.log(this.posts_user)
      });

      for(let i=0;i<=this.posts_user.length;i++)
      {
        //var user_id= this.followList[i];
      //  console.log(this.followList)

       // this.object_user.$key=this.followList[i]
        console.log(this.posts_user[i])

        this.DB.list(`Users/${userId}/makeFollowUserwithID/userFollowPosts`).push(this.posts_user[i]);


        /* this.postRefernce = this.DB.list('Users/'+this.object_user.$key);
          this.postRefernce.subscribe((post_item)=>{
          this.posts_list_follow=post_item; 
          console.log(this.posts_list_follow)
             });
        */
      }

      this.fcm.getToken().then (token =>{
    
      });
      
      
      this.fcm.onNotification().subscribe(data =>{
        if(data.wasTapped)
        {
          alert("user"+userName +"make follow ");
          //alert(JSON.stringify(data))
        }
        else{
          alert("foreground");
  
        }
        
      })
      


  
}

getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;


  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.UsersList = this.UsersList.filter((v) => {
    if(v.Name && q) {
      if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });

  console.log(q, this.UsersList.length);

}

}



