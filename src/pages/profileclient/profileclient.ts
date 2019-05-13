import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Dialogs } from '@ionic-native/dialogs';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ProfileclientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profileclient',
  templateUrl: 'profileclient.html',
})
export class ProfileclientPage {

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileclientPage');
  }

  showBox(index){
    var placeholder;
    switch(index){
      case 0:
      placeholder = "First Name";
      break;

      case 1:
      placeholder = "Last Name";
      break;

      case 2:
      placeholder = "E-mail";
      break;

      case 3:
      placeholder = "New Password";
      break;

      case 4:
      placeholder = "Confirm Password";
      break;
    }

    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'clickedsumtn',
          placeholder: placeholder
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
          text: 'Ok',
          handler: data => {
            
          }
        }
      ]
    });
    alert.present();
  }

}
