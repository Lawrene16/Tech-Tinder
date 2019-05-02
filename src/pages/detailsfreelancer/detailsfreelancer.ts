import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { ChatService } from '../../providers/chat/chat.service';
import { UserService } from '../../providers/user/user.service';
import { User } from '../../models/user.model';
import { Chat } from '../../models/chat.model';
import { ChatPage } from '../chat/chat';
import { FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';


/**
 * Generated class for the DetailsfreelancerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detailsfreelancer',
  templateUrl: 'detailsfreelancer.html',
})
export class DetailsfreelancerPage {

  recipientuser: User;
  currentuser: User;
  res;
  fullname;
  skills;
  experiences;
  hourlyrate;
  writeup;
  users: FirebaseListObservable<User[]>;  // atributo users é uma array de Users do tipo Observable do FireBase



  constructor(public navCtrl: NavController, 
    public authService: AuthService,
    public chatService: ChatService,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public userService: UserService, 
    public navParams: NavParams) {
      this.res = this.navParams.get('res');
      // console.log(this.res);

      this.fullname = this.res.name;
      this.skills = this.res.skillsstring;
      this.hourlyrate = this.res.hourlyRate;
      this.writeup = this.res.aboutMe;
      this.experiences = this.res.experiences;

      console.log(this.res);
      console.log("this.res");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsfreelancerPage');
  }

  onChatCreate(): void {


    var recipientUser: User = {
      $key: this.res.uid, 
      name: this.res.name,
      username: this.res.username,
      email: this.res.email,
      photo: ''
    }

    this.userService.currentUser.first().subscribe((currentUser:User) =>{
    // console.log(currentuser);

    console.log(recipientUser);
    console.log(currentUser);

      this.chatService.getDeepChat(currentUser.$key,recipientUser.$key) //passa o UID dos usuarios  
            .first()  
            .subscribe((chat: Chat) => {  // recebe um chat SE JÁ HOUVER um criado
              
              if(chat.hasOwnProperty('$value')) { // chat tem uma propriedade própria chamada '$value' ? 
                // se tiver, é que não existe
                let timestamp: Object = firebase.database.ServerValue.TIMESTAMP; // pega o timestamp do servido
                
                let chat1 = new Chat('',timestamp,recipientUser.name, (recipientUser.photo || '')); // parametro ultima mensagem e foto vazia
                this.chatService.create(chat1,currentUser.$key,recipientUser.$key);
                
                let chat2 = new Chat('',timestamp,currentUser.name,(currentUser.photo || ''));
                this.chatService.create(chat2,recipientUser.$key,currentUser.$key);
              }

            });
    });

    // this.userService.currentUser  //tem q ter o subscribe por ser uma promise e a gente ficar 'ouvindo' as alteraçoes
    //   .first()
    //   .subscribe((currentUser: User) => {

    //     console.log("currentUser");

        
    //     // o usuario atual é o current User
        
          
    //   }, ((err) =>{
    //     console.log(err);
    //   }))
      this.navCtrl.push(ChatPage, {
        recipientUser: recipientUser  // envia o parametro que é o destinatário da mensagem pra pagina ChatPage
      });
  }

}
