import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController,AlertController} from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Post } from '../../Models/Post.interface';
import { Users } from '../../Models/users';
import { AngularFireAuth } from 'angularfire2/auth';




@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  postRefernce:FirebaseListObservable<Post[]>;
  post_object={}as Post;
  posts_list:Post[];
  posts_list_follow:Post[];
  object_user={} as Users;

  UsersRef : FirebaseListObservable<Users[]>;
  followList : Users[];
  constructor(public navCtrl: NavController,private AngFireAuth:AngularFireAuth, public navParams: NavParams , private DB:AngularFireDatabase,private ActionSctrl:ActionSheetController,private alertCtrl: AlertController)
 {

 
  
 }

 ionViewDidLoad() {
 this.AngFireAuth.authState.take(1).subscribe(data=>{
    this.postRefernce = this.DB.list(`Users/${data.uid}/MyPosts`);
    this.postRefernce.subscribe((post_item)=>{
      this.posts_list=post_item;

   
       });
  })

  this.AngFireAuth.authState.take(1).subscribe(data=>{
    this.UsersRef = this.DB.list(`Users/${data.uid}/makeFollowUserwithID/userFollowPosts`);
    this.UsersRef.subscribe((ids)=>{
      this.followList=ids;

   
       });
  })

}

 goToAddPost()
 {
   this.navCtrl.push('AddPostPage');
  /*
    let alert = this.alertCtrl.create({
      title: 'Add Post',
      inputs: [
        {
          name: 'title',
          placeholder: 'Post Title'
        },
        {
          name: 'content',
          placeholder: 'Post Content',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
              this.post_object.post_title=data.title;
              this.post_object.post_content=data.content;
              this.postRefernce.push(this.post_object);
              this.post_object={}as Post;
          }
        }
      ],

    });
    alert.present();
 */
 }

 onItemClick(post:Post)
 {
  this.ActionSctrl.create({
    title:post.post_title,
    buttons:[
      {
        text:'Edit',
        handler:()=>
        {
         this.navCtrl.push('EditPostPage',post);
        }
      },
      {
        text:'Delete',
        handler:()=>
        {
         this.postRefernce.remove(post.$key);
        }
      },
      {
        text:'Cancel',
        handler:()=>
        {

        }
      }
    ]
  }).present();
 }
}
