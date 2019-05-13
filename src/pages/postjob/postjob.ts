import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompletetestProvider } from '../../providers/completetest/completetest';
import { Keyboard } from 'ionic-angular';

@Component({
  selector: 'page-postjob',
  templateUrl: 'postjob.html',
})
export class PostjobPage {
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

  
  constructor(public navCtrl: NavController, private keyboard: Keyboard) {

  }

    add(item: string) {
    this.input = item;
    this.countries = [];
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

  
}
