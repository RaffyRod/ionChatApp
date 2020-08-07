import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ChatsService, chat } from '../servicios/chats.service';
//import { ChatI } from '../models/chat.interface';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../componentes/chat/chat.component';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  public chatRooms:any = [];

  constructor(private authService: AuthService, 
              public chatsService: ChatsService,
              public modal: ModalController,
              public actionSheetCtrl: ActionSheetController) {}
  
  ngOnInit(){
    this.chatsService.getChatRooms().subscribe( chats => {
      this.chatRooms = chats;      
    });
  }
  openChat(chat){
    this.modal.create({
      component: ChatComponent,
      componentProps:{
        chat: chat
      }
    }).then((modal) => modal.present())
  }
  onLogOut(){
    this.authService.logout();
  } 

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.onLogOut();
        }      
      }]
    });
    await actionSheet.present();
  }
}
