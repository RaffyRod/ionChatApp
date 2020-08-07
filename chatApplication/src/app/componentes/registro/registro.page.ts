import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { rejects } from 'assert';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public email: string;
  public password: string;
  public name: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  onSubmitRegister(){
    this.authService.register(this.email, this.password, this.name).then( auth => {
      this.router.navigate(['/home']);
    }).catch(err => console.log(err));
  }

}
