import { Component } from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {CD} from "../../../models/CD";
import {MediaService} from "../../../services/media.service";
import {LendCdPage} from "../lend-cd/lend-cd";

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cds: CD[];

  constructor(
    private mediaService: MediaService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController
  ) {
  }

  ionViewWillEnter() {
    this.cds = this.mediaService.cds.slice();
  }

  public onToggleMenu() {
    this.menuCtrl.open();
  }

  public onLoad(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

}
