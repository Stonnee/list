import { Subject } from 'rxjs/Subject';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';







@Injectable()
export class AuthService {

  isAuth = true;
  private send;

  constructor(private httpClient: HttpClient ){}

  public authSubject = new Subject<any>();

  signIn(form:NgForm) {

     this.send = {
      "email": form.value['mail'],
      "password": form.value['pwd']
      };

   return this.httpClient
    .post<any[]>('http://127.0.0.1:8080/api/auth/login', this.send)
    .subscribe(
      response => {
        window.sessionStorage.accessToken = "Bearer "+ response['token'];
       this.isAuth = true;
       this.emitAuth();
        console.log('connecté !');
      },
      (error) => {
      console.log('Erreur ! : ' + error);}
    );

  }


  register(form:NgForm) {

     this.send = {
      "email": form.value['mail'],
      "password": form.value['pwd']
      };

   return this.httpClient
    .post<any[]>('http://127.0.0.1:8080/api/auth/signup', this.send)
    .subscribe(
      response => {

        console.log('connecté !');
      },
      (error) => {
      console.log('Erreur ! : ' + error);}
    );

  }

  emitAuth(){
    this.authSubject.next(this.isAuth);
  }

  signOut() {
    this.isAuth = false;
  }
}
