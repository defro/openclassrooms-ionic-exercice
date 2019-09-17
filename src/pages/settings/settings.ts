import { Component } from '@angular/core';
import {LoadingController, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private mediaService: MediaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  public onToggleMenu() {
    this.menuCtrl.open();
  }

  onRestore() {
    let loader = this.loadingCtrl.create({
      content: 'Récupération des données en cours...'
    });
    loader.present();
    this.mediaService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onSave() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.mediaService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onLoadFixtures() {
    this.mediaService.fixtures();
    this.toastCtrl.create({
      message: 'Données de sauvegarde chargées !',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

}
