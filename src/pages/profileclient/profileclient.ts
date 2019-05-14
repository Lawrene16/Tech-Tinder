import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Dialogs } from '@ionic-native/dialogs';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';


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

  firedata = firebase.database();  
  @ViewChild('nameinput') namebox;
  @ViewChild('emailinput') emailbox;
  isPasswordReadOnly = true;
  isPersonalReadonly = true;
  fullname;
  email;
  password = "dkjgkdflgjdlf";
  confirmpassword = "dfkgjdfkgjhfj";


  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
     public navParams: NavParams) {

      this.firedata.ref('/users').child(firebase.auth().currentUser.uid).once('value').then((res) =>{
        console.log(res.val());

        var user = res.val();
        this.fullname = user.name;
        this.email = user.email;
      }).catch((err) =>{
        alert("Couldnt fetch user details");
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileclientPage');
  }

  makeEditable(index){
    switch (index) {
      case 1:
        this.isPersonalReadonly = false;
        this.isPasswordReadOnly = true;
        this.namebox.setFocus();
        // this.emailbox.removeFocus();
        break;
    
      
    
      case 2:
      this.isPersonalReadonly = true;
      this.isPasswordReadOnly = false;
      this.emailbox.setFocus();
      // this.namebox.removeFocus();
        break;

    }
  }

  stopEdit(){
    this.isPersonalReadonly = true;
    this.isPasswordReadOnly = true;
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


  saveprofile(){

  }

}
