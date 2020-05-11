import { reqService } from './service/req.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'chefing';
  isPut: boolean = false;

  @ViewChild('id') hiddenInput: ElementRef;
  @ViewChild('nb') nbInput: ElementRef;
  @ViewChild('title') titleInput: ElementRef;

  constructor(private Request: reqService) {}

  ngAfterViewInit() {}

  ngOnInit() {}

  Refresh() {
    this.Request.getReqFromServer();
  }

  put(id, stuff) {
    this.hiddenInput.nativeElement.value = id;
    this.titleInput.nativeElement.value = stuff.title;
    this.nbInput.nativeElement.value = stuff.nb;
    this.isPut = true;
  }

  onSubmit(form: NgForm) {
    if (this.isPut) {
      const put = [
        this.titleInput.nativeElement.value,
        this.nbInput.nativeElement.value,
        this.hiddenInput.nativeElement.value,
      ];

      this.Request.putReqFromServer(put);
      this.isPut = false;
      form.reset();
      this.Refresh();
    }

    else {
      this.Request.newReqFromServer(form);
      form.reset();
      this.Refresh();
    }
  }

  suppr(id) {
    this.Request.supprReqFromServer(id);
    this.Refresh();
  }
}
