import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../servicios/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _cs:ChatService) { }

  ngOnInit() {
  }

  ingresar(metodo){
    console.log("el metodo:", metodo);
    this._cs.login(metodo);
  }

  salir(){
    this._cs.logout();
  }
}
