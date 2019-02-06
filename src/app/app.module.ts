import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation'
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule , AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth,AngularFireAuthModule} from 'angularfire2/auth';
import {Camera} from '@ionic-native/camera' ;
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddInfoPage } from '../pages/add-info/add-info';
import { NotificationPage } from '../pages/notification/notification';
import { PostsPage } from '../pages/posts/posts';
import { FllowUserPage } from '../pages/fllow-user/fllow-user';
import { SelectSearchableModule } from 'ionic-select-searchable';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {FCM} from '@ionic-native/fcm';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PostsPage,
    SignupPage,
    ProfilePage,
    HomePage,
    TabsPage,
    FllowUserPage,
    AddInfoPage,
    NotificationPage
    
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAguDUazRdMFvf51qFL54ysppW3gsOAXRw"
    }),
    BrowserModule,
    HttpClientModule,
    SelectSearchableModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAguDUazRdMFvf51qFL54ysppW3gsOAXRw",
      authDomain: "testfirebase-c22a1.firebaseapp.com",
      databaseURL: "https://testfirebase-c22a1.firebaseio.com",
      projectId: "testfirebase-c22a1",
      storageBucket: "testfirebase-c22a1.appspot.com",
      messagingSenderId: "667064706762",
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    PostsPage,
    ProfilePage,
    HomePage,
    TabsPage,
    AddInfoPage,
    FllowUserPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    LocalNotifications,
    Geolocation,
    Camera,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
