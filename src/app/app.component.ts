import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseAuthState } from 'angularfire2';

import { AuthService } from './../providers/auth/auth.service';
import { SigninPage } from '../pages/signin/signin';
import { User } from '../models/user.model';
import { UserService } from '../providers/user/user.service';
import { TabsclientPage } from '../pages/tabsclient/tabsclient';
import { TabsfreelancerPage } from '../pages/tabsfreelancer/tabsfreelancer';
import { PostjobPage } from '../pages/postjob/postjob';
import { ProfileclientPage } from '../pages/profileclient/profileclient';
import { JoblistPage } from '../pages/joblist/joblist';
// import { FirebaseAuthState } from 'angularfire2/auth';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  fullname;
  firedata = firebase.database();
  email;
  // currentUser: User;
  pages: Array<{ title: string, icon: string, component: any, pageName: string, index: any }>;

  constructor(
    public authService: AuthService,
    platform: Platform,
    statusBar: StatusBar,
    public splashScreen: SplashScreen,
    userService: UserService
  ) {

    authService.auth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        // this.rootPage = HomePage;
        userService.currentUser.subscribe((user: any) => {

          // console.log(user);
          // this.currentUser = user;

          this.fullname = user.username;
          this.email = user.email;

          if (user.userType == "recruiter") {
            this.rootPage = TabsclientPage;
            // this.rootPage = ProfileclientPage;           
            
            this.pages = [
              { title: 'Home', icon: 'ios-home', component: TabsclientPage, pageName: 'GotopremiumPage', index: 1 },
              { title: 'Profile', icon: 'ios-person', component: ProfileclientPage, pageName: 'GotopremiumPage', index: 0 },
              { title: 'Settings', icon: 'ios-settings', component: TabsclientPage, pageName: 'GotopremiumPage', index: 1 },
              { title: 'Post Job!', icon: 'ios-alert', component: PostjobPage, pageName: 'GotopremiumPage', index: 2 },
              { title: 'Logout', icon: 'ios-log-out', component: SigninPage, pageName: 'GotopremiumPage', index: 6 },
            ];
          } else if (user.userType == "freelancer") {
            this.rootPage = TabsfreelancerPage;
            // this.rootPage = ProfilefreelancerPage;
            
            this.pages = [
              { title: 'Search Jobs', icon: 'ios-search', component: TabsfreelancerPage, pageName: 'GotopremiumPage', index: 0 },
              { title: 'Job Posts', icon: 'ios-pricetags', component: JoblistPage, pageName: 'GotopremiumPage', index: 1 },
              { title: 'Invite', icon: 'ios-alert', component: TabsfreelancerPage, pageName: 'GotopremiumPage', index: 2 },
              { title: 'Logout', icon: 'ios-log-out', component: SigninPage, pageName: 'GotopremiumPage', index: 6 },
            ];
          }
          // console.log(user.userType);// recebe o usuário que está atualmente logado
        })
      } else {
        this.rootPage = SigninPage;
        // this.rootPage = SetupprofilePage;

      }
    })

    platform.ready().then(() => {
      statusBar.styleDefault();
      setTimeout(()=>{
        this.splashScreen.hide();  
      },1000);
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == "Logout"){
      this.authService.logOut().then(() =>{
        this.nav.setRoot(page.component);        
      });

    }else{
        this.nav.setRoot(page.component);
    }
  }
}

