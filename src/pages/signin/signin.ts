import { Component } from '@angular/core';
import { AlertController, Loading, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { AuthService } from '../../providers/auth/auth.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

import { SignupPage } from './../signup/signup';
import { TabsclientPage } from '../tabsclient/tabsclient';
import { TabsfreelancerPage } from '../tabsfreelancer/tabsfreelancer';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  firedata = firebase.database();
  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;    

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignUp(): void {
    this.navCtrl.push(SignupPage);
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();  // retorna o loading
    let user = this.signinForm.value;

    this.authService.signInWithEmail(user)
      .then((isLogged: boolean) => {
        if (isLogged) {
          console.log(user);

          this.firedata.ref('/users').orderByChild('mmmm').once('value', (snapshot) => {
            let result = snapshot.val();
            let temparr = [];
            for (var key in result) {
              temparr.push(result[key]);
            }

            temparr.forEach((fireuser) => {
              // console.log(fireuser);
              // console.log(user);
              if(user.email == fireuser.email){
                // console.log(fireuser);
                // console.log(user);
                if(fireuser.userType == "recruiter"){
                  this.navCtrl.setRoot(TabsclientPage);
                }else if(fireuser.userType == "freelancer"){
                  this.navCtrl.setRoot(TabsfreelancerPage);
                }
              }
            });
          })
          loading.dismiss();
        }
      })
      .catch((er: any) => {
        loading.dismiss();
        this.showAlert(er)
      })

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

  forgotPassword(){
    this.navCtrl.push(ResetpasswordPage)
  }

}
