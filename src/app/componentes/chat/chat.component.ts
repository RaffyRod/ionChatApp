import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Message } from '../../models/message';
import { ChatsService } from '../../servicios/chats.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public name : string;
  public mensajes = [];
  public message : Message; 

  constructor(private navParams: NavParams, 
              private modalCtrl: ModalController,
              private chatService: ChatsService) { }

  ngOnInit() {
   this.chatService.getChatRooms()
   this.name = this.navParams.get('name')
  }

  closeChat(){
    this.modalCtrl.dismiss();
  }
  sendMessage(){
    this.mensajes.push(this.message);    
  }

}
