import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {CD} from "../../../models/CD";
import {MediaService} from "../../../services/media.service";
import {LendCdPage} from "../lend-cd/lend-cd";
import {Subscription} from "rxjs";
import {SettingsPage} from "../../settings/settings";

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage implements OnInit, OnDestroy {

  settingsPage = SettingsPage;
  private subscription: Subscription;
  cds: CD[] = [];

  constructor(
    private mediaService: MediaService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController
  ) {
  }

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    this.subscription = this.mediaService.cds$.subscribe(
      (cds: CD[]) => {
        this.cds = cds.slice();
      },
      (error) => {
        console.error('Erreur lors du chargement des CDs: ' + error);
      }
    );
    this.mediaService.emitAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isEmpty() {
    return (!this.cds || !this.cds.length);
  }

  public onToggleMenu() {
    this.menuCtrl.open();
  }

  public onLoad(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

}
