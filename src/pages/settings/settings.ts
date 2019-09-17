import { Component } from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';
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
    private mediaService: MediaService
  ) {}

  public onToggleMenu() {
    this.menuCtrl.open();
  }

  onSave() {
    this.mediaService.saveData();
  }

  onRestore() {
    this.mediaService.retrieveData();
  }
}
