import { Component } from '@angular/core';
import {MenuController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private menuCtrl: MenuController) {
  }

  public onToggleMenu() {
    this.menuCtrl.open();
  }

}
