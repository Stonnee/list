import { AppComponent } from './../app.component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { reqService } from './../service/req.service';
import {
  Component, OnInit, AfterViewInit, ElementRef, ViewChild,} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit{
  req: any[];
  reqSubscription: Subscription;


  constructor(private Request: reqService, private app: AppComponent) {

  }

  ngOnInit(): void {

    this.Request.getReqFromServer();
    this.reqSubscription = this.Request.reqSubject
    .subscribe((reqs: any[]) => {
      this.req = reqs;
    });
  }

  put(id){

    const stuff = this.req.find((stuff) => {
      return stuff._id === id;
    });
    this.app.put(id, stuff);
  }

  suppr(id){
    this.app.suppr(id);
  }


}
