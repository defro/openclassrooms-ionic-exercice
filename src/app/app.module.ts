import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {BookListPage} from "../pages/book/book-list/book-list";
import {LendBookPage} from "../pages/book/lend-book/lend-book";
import {CdListPage} from "../pages/cd/cd-list/cd-list";
import {LendCdPage} from "../pages/cd/lend-cd/lend-cd";
import {SettingsPage} from "../pages/settings/settings";
import {TabsPage} from "../pages/tabs/tabs";
import {MediaService} from "../services/media.service";
import {AuthService} from "../services/auth.service";
import {AuthPage} from "../pages/auth/auth";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookListPage,
    LendBookPage,
    CdListPage,
    LendCdPage,
    SettingsPage,
    TabsPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookListPage,
    LendBookPage,
    CdListPage,
    LendCdPage,
    SettingsPage,
    TabsPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaService,
    AuthService
  ]
})
export class AppModule {}
