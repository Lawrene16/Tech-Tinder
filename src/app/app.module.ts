import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule, AuthMethods, AuthProviders, FirebaseAppConfig } from 'angularfire2'; //importa o firebase app config

import { AuthService } from '../providers/auth/auth.service';
import { CapitalizePipe } from '../pipes/capitalize/capitalize';
import { ChatPage } from '../pages/chat/chat';
import { ChatService } from '../providers/chat/chat.service';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header.component';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { MessageService } from '../providers/message/message.service';
import { MyApp } from './app.component';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserService } from '../providers/user/user.service';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { TabsclientPage } from '../pages/tabsclient/tabsclient';
import { TabsfreelancerPage } from '../pages/tabsfreelancer/tabsfreelancer';
import { JobsPage } from '../pages/jobs/jobs';
import { ProfilefreelancerPage } from '../pages/profilefreelancer/profilefreelancer';
import { FreelancersPage } from '../pages/freelancers/freelancers';
import { ShortlistedPage } from '../pages/shortlisted/shortlisted';
import { ChatsPage } from '../pages/chats/chats';
import { SetupprofilePage } from '../pages/setupprofile/setupprofile';
import { ModalPage } from '../pages/modal/modal';
import { DetailsfreelancerPage } from '../pages/detailsfreelancer/detailsfreelancer';
import { PostjobPage } from '../pages/postjob/postjob';
import { ProfileclientPage } from '../pages/profileclient/profileclient';
import { JoblistPage } from '../pages/joblist/joblist';
import { Geolocation } from  '@ionic-native/geolocation';

/* Salva as configurações do firebase (pega no painel do projeto no site do firebase) em uma constante */
const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAKq8NqNzRd7Z_GMe2XVK95Km8HTHOlYYs",
    authDomain: "tech-tinder.firebaseapp.com",
    databaseURL: "https://tech-tinder.firebaseio.com",
    storageBucket: "tech-tinder.appspot.com",
  // messagingSenderId: "717491479259"
};


const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SigninPage,
    TabsclientPage,
    TabsfreelancerPage,
    JobsPage,
    PostjobPage,
    ProfileclientPage,
    FreelancersPage,
    ShortlistedPage,
    SetupprofilePage,
    JoblistPage,    
    DetailsfreelancerPage,
    ModalPage,
    ProfilefreelancerPage,
    ChatsPage,
    SignupPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
      // tabsLayout:'icon-left',
      preloadModules: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    MyApp,
    SetupprofilePage,
    JobsPage,
    DetailsfreelancerPage,
    ModalPage,
    FreelancersPage,
    ShortlistedPage,
    JoblistPage,
    PostjobPage,
    ProfileclientPage,
    ProfilefreelancerPage,
    SigninPage,
    TabsclientPage,
    ChatsPage,
    TabsfreelancerPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    AuthService,
    ChatService,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    MessageService,
  ]
})
export class AppModule {}
