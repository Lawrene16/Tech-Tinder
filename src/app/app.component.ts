import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseAuthState } from 'angularfire2';

import { AuthService } from './../providers/auth/auth.service';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { User } from '../models/user.model';
import { UserService } from '../providers/user/user.service';
import { TabsclientPage } from '../pages/tabsclient/tabsclient';
import { TabsfreelancerPage } from '../pages/tabsfreelancer/tabsfreelancer';
// import { FirebaseAuthState } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = SigninPage;
  currentUser: User;

  constructor(
    authService: AuthService,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    userService: UserService
  ) {

    authService.auth.subscribe((authState: FirebaseAuthState) => {
      if (authState) {
        // this.rootPage = HomePage;
        userService.currentUser.subscribe((user: any) => {
          this.currentUser = user;  
          if(user.userType == "recruiter"){
              this.rootPage =TabsclientPage;
          }else if(user.userType == "freelancer"){
              this.rootPage = TabsfreelancerPage;
          }
          // console.log(user.userType);// recebe o usuário que está atualmente logado
        })
      } else {
        this.rootPage = SigninPage;
      }
    })

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}

