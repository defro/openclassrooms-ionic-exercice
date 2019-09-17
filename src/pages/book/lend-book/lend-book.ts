import {Component, OnInit} from '@angular/core';
import {NavParams, ToastController, ViewController} from 'ionic-angular';
import {Book} from "../../../models/Book";
import {MediaService} from "../../../services/media.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit{

  index: number;
  book: Book;
  myForm: FormGroup;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private mediaService: MediaService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index');
    this.book = this.mediaService.books[this.index];
    this.initForm();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleLend() {
    this.mediaService.toggleLendStatus('book', this.index);
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const name = this.myForm.get('name').value;
    this.mediaService.addBorrower('book', this.index, name);

    let toast = this.toastCtrl.create({
      message: "Le nom de l'emprunteur a été enregistré.",
      dismissOnPageChange: true,
      duration: 3000,
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }

}
