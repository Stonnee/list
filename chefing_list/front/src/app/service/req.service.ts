import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class reqService {
  public reqSubject = new Subject<any[]>();
  private req = [];
  private send;

  constructor(private httpClient: HttpClient) {}

  emitReqSubject() {
    this.reqSubject.next(this.req.slice());
  }

  newReqFromServer(form: NgForm): void {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      window.sessionStorage.accessToken
    );
    headers = headers.append('Content-Type', 'application/json');

    this.send = {
      title: form.value['title'],
      nb: form.value['nb'],
    };

    this.httpClient
      .post('http://127.0.0.1:8080/api/stuff', this.send, { headers })
      .subscribe(
        () => {
          this.emitReqSubject();
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getReqFromServer(): any {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      window.sessionStorage.accessToken
    );
    headers = headers.append('Content-Type', 'application/json');

    this.httpClient
      .get<any[]>('http://127.0.0.1:8080/api/stuff', { headers })
      .subscribe(
        (response) => {
          this.req = response;
          this.emitReqSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  supprReqFromServer(id): void {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      window.sessionStorage.accessToken
    );
    headers = headers.append('Content-Type', 'application/json');

    this.httpClient
      .delete('http://127.0.0.1:8080/api/stuff/' + id, { headers })
      .subscribe(
        () => {
          console.log('suprr');
          this.emitReqSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  putReqFromServer(form: Array<any>): void {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      window.sessionStorage.accessToken
    );
    headers = headers.append('Content-Type', 'application/json');

    this.send = {
      title: form[0],
      nb: form[1],
    };

    this.httpClient
      .put('http://127.0.0.1:8080/api/stuff/' + form[2], this.send, { headers })
      .subscribe(
        () => {
          console.log('modif');
          this.emitReqSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
