import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Keyboard } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { TabsfreelancerPage } from '../tabsfreelancer/tabsfreelancer';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';


/**
 * Generated class for the SetupprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setupprofile',
  templateUrl: 'setupprofile.html',
})
export class SetupprofilePage {


  firedata = firebase.database();
  skills: Array<string>;
  private list: string[] = [ 'Android',
                        'UI',
                        'Photoshop',
                        'Excel',
                        'Xcode',
                        'Ionic',
                        'Visual Studio',
                        'React',
                        'Vue',
                        'iOS',
                        'Project Management',
                        'Swift'];
    public input: string = '';
    public countries: string[] = [];
    skillstobeuploaded = [];
    isshidden = true;
    fullname;
    writeup = "";
    hourlyrate;
    experienceslist = [];
    shouldhidetext = false;
    stringtoupload = "";
    shouldhidetexttwo = false;
    skillsstring:string;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private keyboard: Keyboard,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {

      this.fullname = this.navParams.get('fullname');
      this.hourlyrate = '0';
  }

  add(item: string, i) {

    this.isshidden = false;
    // this.input = item;
    var currentskills = document.getElementById("currentskills");

    // if(this.skillstobeuploaded.length == 0){
      this.skillsstring = item + " | " + currentskills.innerHTML;

      this.stringtoupload = this.stringtoupload + item + ' | ';
      console.log(this.stringtoupload);
      currentskills.innerHTML = this.skillsstring;
    
      // console.log(item, i);
      this.skillstobeuploaded.push(item);

    this.countries = [];
    this.input = "";
  }

  removeFocus() {
    this.keyboard.close();
  }

  ionViewDidLoad(){
    if(this.writeup.length != 0){
      this.shouldhidetexttwo = true;
    }
  }

  search() {
    if (!this.input.trim().length || !this.keyboard.isOpen()) {
      this.countries = [];
      return;
    }
    
    this.countries = this.list.filter(item => item.toUpperCase().includes(this.input.toUpperCase()));
  }

  presentModal() {
      this.navCtrl.push(ModalPage,
        {
            // data: this.data,
            callback: this.getData
        });
  }

      getData = data =>
    {
      return new Promise((resolve, reject) => {
        resolve();
        console.log(data);
        this.writeup = data;
        this.shouldhidetexttwo = true;
      });
    };

  presentToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  showBox(index){
    var placeholder;
    var type;
    var classtouse;

    switch(index){
      case 0:
      placeholder = "Full Name";
      type = 'text';
      break;

      case 1:
      placeholder = "Hourly Rate";
      type = 'number';
      break;

      case 3:
      placeholder = "Hourly Rate";
      type = 'number';
          this.presentModal();
          break;

    }
    var inputs = [
      {
        name: 'clickedsumtn',
        placeholder: placeholder,
        type: type
      }
    ];

    if(index == 2){
        inputs = [
          {
          name: 'role',
          placeholder: 'Role',
          type: 'text'
        },
        {
          name: 'company',
          placeholder: 'Company',
          type: 'text'
        },
      ];
    }


    let alert = this.alertCtrl.create({
      inputs: inputs,
      cssClass: classtouse,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {
            switch(index){
              case 0:
                this.fullname = data.clickedsumtn;
                break;

              case 1:
                  this.hourlyrate = data.clickedsumtn
                  break;  

              case 2:
                  if(data.role != "" && data.role != null && data.company != "" && data.company != null){
                    this.experienceslist.push({
                      role: data.role,
                      company: data.company
                    });
                  }else if(data.role == "" || data.role == null){
                    this.presentToast("Role Field Cannot be left blank");
                  }else if(data.company == "" || data.company == null){
                    this.presentToast("Company name cannot be left blank");
                  }                  
            }

            if(this.experienceslist.length != 0){
                this.shouldhidetext = true;
            }
          }
        }
      ]
    });
    if(index != 3){
        alert.present();
    }else if(index == 3){
        alert.dismiss();
    }
  }


  removeExperience(experience, index){
    this.experienceslist.splice(index, 1);
    console.log(this.experienceslist.length);

    if(this.experienceslist.length == 0){
      this.shouldhidetext = false;
    }
  }

  revert(){
    // console.log(this.skillstobeuploaded.length);
    console.log(this.skillstobeuploaded[this.skillstobeuploaded.length-1]);
    this.skillsstring = this.skillsstring.replace(this.skillstobeuploaded[this.skillstobeuploaded.length-1] + " | ", "");

    this.skillstobeuploaded.splice(this.skillstobeuploaded.length - 1);
    var currentskills = document.getElementById("currentskills");
    currentskills.innerHTML = this.skillsstring;    
  
    if(this.skillstobeuploaded.length == 0){
        this.isshidden = true;
    }

  }

  saveprofile(){
    let load = this.loadingCtrl.create({
      content:'Setting up your Profile',
    });
    load.present();

    this.firedata.ref('/users').child(firebase.auth().currentUser.uid).update({
      hourlyRate: '$' + this.hourlyrate + '/hr',
      skillstags: this.skillstobeuploaded,
      skillsstring: this.stringtoupload,
      experiences: this.experienceslist,
      aboutMe: this.writeup
    }).then(() =>{
        this.navCtrl.push(TabsfreelancerPage);
        load.dismiss();
    }).catch((err) =>{
      this.presentToast(err);
      load.dismiss();
    })
  }


}
