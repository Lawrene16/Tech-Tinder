import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';


@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  email="";
  constructor(public navCtrl: NavController,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthService,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

  resetPassword(){
    let load = this.loadingController.create({
      content: "Sending password reset link to your email",
    });

    load.present()

    this.authService.resetPassword(this.email).then(() =>{
        load.dismiss();
        this.navCtrl.pop();
        this.presentToast("Password reset link has been sent to your email")
    }).catch((err) =>{
        this.presentToast(err);
        load.dismiss()
    })
  }

  presentToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

}
