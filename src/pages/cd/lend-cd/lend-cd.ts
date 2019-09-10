import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {CD} from "../../../models/CD";
import {MediaService} from "../../../services/media.service";

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  index: number;
  cd: CD;

  constructor(
    private mediaService: MediaService,
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index');
    this.cd = this.mediaService.cds[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleLend() {
    this.mediaService.toggleLendStatus('cd', this.index);
  }

}
