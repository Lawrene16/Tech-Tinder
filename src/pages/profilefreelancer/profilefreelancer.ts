import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profilefreelancer',
  templateUrl: 'profilefreelancer.html',
})
export class ProfilefreelancerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilefreelancerPage');
  }

}
