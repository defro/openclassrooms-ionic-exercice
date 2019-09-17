import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import {AuthPage} from "../pages/auth/auth";

import firebase from "firebase";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  settingsPage: any = SettingsPage;
  authPage: any = AuthPage;

  isAuth: boolean = false;

  @ViewChild('content') content: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      let firebaseConfig = {
        apiKey: "AIzaSyCzWBnoNtUjik0sIYj-rtn2l1Q49Op4h7A",
        authDomain: "open-classrooms-ionic-exercice.firebaseapp.com",
        databaseURL: "https://open-classrooms-ionic-exercice.firebaseio.com",
        projectId: "open-classrooms-ionic-exercice",
        storageBucket: "",
        messagingSenderId: "378257970416",
        appId: "1:378257970416:web:d0a6d1a78e8d73c6b59e35"
      };
      firebase.initializeApp(firebaseConfig);

      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, {mode: 'connect'});
          }
        }
      );
    });
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

}
