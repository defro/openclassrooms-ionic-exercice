import { Component } from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {MediaService} from "../../../services/media.service";
import {Book} from "../../../models/Book";
import {LendBookPage} from "../lend-book/lend-book";

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  books: Book[];

  constructor(
    private mediaService: MediaService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController
  ) {
  }

  ionViewWillEnter() {
    this.books = this.mediaService.books.slice();
  }

  public onToggleMenu() {
    this.menuCtrl.open();
  }

  public onLoad(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

}
