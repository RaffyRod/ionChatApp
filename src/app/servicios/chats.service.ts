import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ChatI } from '../models/chat.interface';
import { Message } from '../models/message';
import { firestore } from 'firebase';

export interface chat {
  description : string
  name : string
  id: string
  img : string
}


@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private db: AngularFirestore) { }

  getChatRooms(){
   return  this.db.collection('chatRooms').snapshotChanges().pipe(map( rooms =>{
     return rooms.map(a => {
       const data = a.payload.doc.data() as ChatI;
       data.id = a.payload.doc.id;
       return data;
     })
   }))
  }
  getChatRoom( chat_id : string){
    return this.db.collection('chatRooms').doc(chat_id).valueChanges();
  }

  sendMsgToFirebase( message: Message, chat_id: string){
    this.db.collection('chatRooms').doc(chat_id).update({
      messages : firestore.FieldValue.arrayUnion(message), // convierte el valor(objeto) en un array
    })
  }
}
