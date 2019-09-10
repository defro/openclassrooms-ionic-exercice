import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {BookListPage} from "../book/book-list/book-list";
import {CdListPage} from "../cd/cd-list/cd-list";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homePage = HomePage;
  bookListPage = BookListPage;
  cdListPage = CdListPage;

}
