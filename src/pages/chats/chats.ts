import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../providers/chat/chat.service';
import { UserService } from './../../providers/user/user.service';
import { User } from '../../models/user.model';
import { ChatPage } from '../chat/chat';



@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  chats: FirebaseListObservable<Chat[]>;

  constructor(public navCtrl: NavController,
    public chatService: ChatService,
    public userService: UserService,  // injeta o user service
     public navParams: NavParams) {

    // console.log(this.chats);

  }

  ionViewDidLoad() {
    this.chats = this.chatService.chats;

    console.log(this.chats);

  }


  onChatOpen(chat: Chat): void {
    let recipientUserId: string = chat.$key; // recebe o ID do usuario destinatário
    this.userService.getUser(recipientUserId)
      .first()
      .subscribe((user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: user  // envia o parametro que é o destinatário da mensagem pra pagina ChatPage
        });
      });
  }
  
}
