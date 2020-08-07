import { Injectable } from '@angular/core';
import { AngularFireAuth}  from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private router: Router) { }
  login(email: string, password: string){
    return new Promise((resolve, rejected) => {
      this.afAuth.signInWithEmailAndPassword(email,password).then( user => { 
        resolve(user)       
    }).catch( err => rejected(err));
    });    
  }
  logout(){
    this.afAuth.signOut().then(()=> {
      this.router.navigate(['/login']);
    });    
  }
  register(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then( res => {
          resolve(res)
      }).catch( err => reject(err));
    })
  }
  
}  
