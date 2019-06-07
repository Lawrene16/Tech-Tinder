import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController, LoadingController,  } from 'ionic-angular';
import { Keyboard } from 'ionic-angular';
import firebase from 'firebase';
import { TabsclientPage } from '../tabsclient/tabsclient';

@Component({
  selector: 'page-postjob',
  templateUrl: 'postjob.html',
})
export class PostjobPage {
  @ViewChild('myInput') myInput: ElementRef;
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
                            'Swift',
                            'Project Management',
                            'Swift'];
  public input: string = '';
  public countries: string[] = [];
  isshortcolor = "#ffffff"
  islongcolor = "#ffffff"
  duration = "";
  description = "";
  title = "";
  category = "";
  url = "";
  skilllevel = "";
  jobtype = "";
  pinuid;
  timeposted;
  firedata = firebase.database();
  

  
  constructor(public navCtrl: NavController,
    public element:ElementRef,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
     private keyboard: Keyboard) {

    
      
// console.log("Current Date ",date.getTime()) 
  }

    add(item: string) {
    this.input = item;
    this.countries = [];
  }


  setShort(){
    this.isshortcolor = '#006096';
    this.islongcolor = '#ffffff';
    this.duration = "longterm";
  }

  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
}


  setLong(){
    this.isshortcolor = '#ffffff';
    this.islongcolor = '#006096';
    this.duration = "shortterm";
  }
  removeFocus() {
    this.keyboard.close();
  }

  search() {
    if (!this.input.trim().length || !this.keyboard.isOpen()) {
      this.countries = [];
      return;
    }
    
    this.countries = this.list.filter(item => item.toUpperCase().includes(this.input.toUpperCase()));
  }

  postJob(){
    console.log(this.duration);
    console.log(this.title);
    console.log(this.category);
    console.log(this.description);
    console.log(this.url);  

    if(this.duration == ""){
      this.presentToast("Please select a job duration");
    }else if(this.title == ""){
      this.presentToast("Please Enter a Job Title");
    }else if(this.category == ""){
      this.presentToast("Please select a job category");
    }else if(this.skilllevel == ""){
      this.presentToast("Please select a skill level");
    }
    else if(this.description == ""){
      this.presentToast("Please Enter a Job Description");
    }else if(this.description.length < 15){
      this.presentToast("Job Description should be atleast 15 words");
    }else if(this.url == "" || this.url.length < 3 || !this.url.includes(".")){
      this.presentToast("Please Enter a valid url for project files");
    }else{
      
      this.timeposted = new Date();
      
      let load = this.loadingCtrl.create({
        content:'Logging you in',
      });
      load.present();

      
      this.pinuid = this.firedata.ref('/users').push().key;
      this.firedata.ref('/jobs').child(this.pinuid).set({
        duration: this.duration,
        title: this.title,
        category: this.category,
        description: this.description,
        skilllevel: this.skilllevel,
        jobtype: this.jobtype,
        timeposted: this.timeposted.getTime(),
        url: this.url,
        jobposter: firebase.auth().currentUser.uid
      }).then(() =>{
          this.presentToast("Your Job Post is Live!!!");
          load.dismiss();
          this.navCtrl.setRoot(TabsclientPage);
      }).catch((err) =>{
          load.dismiss();
          this.presentToast(err);
      });
    }
  }

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


  
}
