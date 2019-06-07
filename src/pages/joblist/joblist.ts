import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


@Component({
  selector: 'page-joblist',
  templateUrl: 'joblist.html',
})
export class JoblistPage {

  firedata = firebase.database();
  joblist = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoblistPage');
    this.loadJobs()
  }

  loadJobs(){
    this.joblist = [];
    this.firedata.ref('/jobs').orderByChild('mm').once('value', snapshot =>{
      // console.log(snapshot.val())
      let result = snapshot.val();
      let temparr = [];
      for (var key in result) {
        temparr.push(result[key]);
      }
      temparr.forEach(job => {
        this.joblist.push(job);
      });




    console.log(this.joblist);


    });
  }

}
