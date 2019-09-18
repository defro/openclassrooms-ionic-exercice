import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {MediaService} from "../../../services/media.service";
import {Book} from "../../../models/Book";
import {LendBookPage} from "../lend-book/lend-book";
import {Subscription} from "rxjs";
import {SettingsPage} from "../../settings/settings";

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy{

  settingsPage = SettingsPage;
  books: Book[];
  private subscription: Subscription;

  constructor(
    private mediaService: MediaService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController
  ) {
  }

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    this.subscription = this.mediaService.books$.subscribe(
      (books: Book[]) => {
        this.books = books.slice();
      },
      (error) => {
        console.error('Erreur lors du chargement des livres: ' + error);
      }
    );
    this.mediaService.emitAll();
  }

  isEmpty() {
    return (!this.books || !this.books.length);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onLoad(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

  public onToggleMenu() {
    this.menuCtrl.open();
  }

}
