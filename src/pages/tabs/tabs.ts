import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { NotificationPage } from '../notification/notification';
import { AddInfoPage } from '../add-info/add-info';
import { PostsPage } from '../posts/posts';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  postRoot = PostsPage;
  proflieRoot =ProfilePage;
  InfoRoot =AddInfoPage;
  notificationRoot =NotificationPage;
  MyPosts='MyPostsPage';
  AllUsers='AllUsersPage';
  homeRoot=HomePage;


  constructor() {
  }
}
