import {Component, OnInit} from '@angular/core';
import {NavParams, ToastController, ViewController} from 'ionic-angular';
import {CD} from "../../../models/CD";
import {MediaService} from "../../../services/media.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  index: number;
  cd: CD;
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
    this.cd = this.mediaService.cds[this.index];
    this.initForm();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleLend() {
    this.mediaService.toggleLendStatus('cd', this.index);
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
