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
  public chat : any;
  public mensajes = [];
  //public message : Message; 
  public room : any;
  public msg : string;

  constructor(private navParams: NavParams, 
              private modalCtrl: ModalController,
              private chatService: ChatsService) { }

  ngOnInit() {
   this.chatService.getChatRoom( this.chat.id).subscribe( room =>{
     console.log(room);
     this.room = room;
   })
   this.chat = this.navParams.get('chat')
  }

  closeChat(){
    this.modalCtrl.dismiss();
  }
  sendMessage(){
   // this.mensajes.push(this.message); 
   const mensaje : Message = {
         content: this.msg,
         type : 'text',
         date : new Date()
   } 
   this.chatService.sendMsgToFirebase( mensaje, this.chat.id);  
  }

}
