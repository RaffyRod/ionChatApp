import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ChatsService, chat } from '../servicios/chats.service';
//import { ChatI } from '../models/chat.interface';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../componentes/chat/chat.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  public chatRooms:any = [];

  constructor(private authService: AuthService, 
              public chatsService: ChatsService,
              public modal: ModalController) {}
  
  ngOnInit(){
    this.chatsService.getChatRooms().subscribe( chats => {
      this.chatRooms = chats;      
    });
  }

  openChat(chat){
    this.modal.create({
      component: ChatComponent,
      componentProps:{
        name: chat.name
      }
    }).then((modal) => modal.present())
  }
  onLogOut(){
    this.authService.logout();
  } 

}
