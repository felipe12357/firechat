import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Mensaje} from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats:Mensaje[]=[];
  
  public usuario:any={};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user=>{
      console.log("estado usuario",user);

      if(!user) return;

      this.usuario.nombre=user.displayName;
      this.usuario.uid=user.uid;
      this.usuario.foto=user.photoURL;
    });            
  }

  login(tipo) {
    if(tipo==="google")
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    if(tipo==="facebook")
      this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  logout() {
    this.usuario={};
    this.afAuth.auth.signOut();
  }

  cargarMensajes(){
   
      this.itemsCollection = 
        this.afs.collection<Mensaje>('chats',ref=>
          ref.orderBy('fecha','desc')
             .limit(5));

      return this.itemsCollection.valueChanges()
      .pipe(map(mensajes=>{
          this.chats=[];
          for(const mensaje of mensajes){
            this.chats.unshift(mensaje);
          }

      }));
  }

  insertarMensaje(mensaje){
    const insert:Mensaje={
      nombre:this.usuario.nombre,
      mensaje:mensaje,
      fecha:new Date().getTime(),
      uid:this.usuario.uid
    };
    return this.itemsCollection.add(insert);
  }

}
