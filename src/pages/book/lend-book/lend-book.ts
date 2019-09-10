import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Book} from "../../../models/Book";
import {MediaService} from "../../../services/media.service";

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit{

  index: number;
  book: Book;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private mediaService: MediaService
  ) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index');
    this.book = this.mediaService.books[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleLend() {
    this.mediaService.toggleLendStatus('book', this.index);
  }

}
