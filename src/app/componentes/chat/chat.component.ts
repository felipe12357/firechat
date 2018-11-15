import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../servicios/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensajeInput:string;

  elemento:any;

  constructor(public _chatService: ChatService) {
    
    this._chatService.cargarMensajes()
    .subscribe(()=>{
      setTimeout(()=>{
        this.elemento.scrollTop=this.elemento.scrollHeight;
      },20);
    });
  }


  ngOnInit() {
    this.elemento=document.getElementById('app-mensajes');
    console.log(this.elemento);
    

  }

  enviar_mensaje(){
    
    if(this.mensajeInput!=="")
    this._chatService.insertarMensaje(this.mensajeInput)
    .then(data=>{
      this.mensajeInput="";
    });

  }
}
