import DataSnapshot = firebase.database.DataSnapshot;
import firebase from "firebase";
import {Subject} from "rxjs";
import {Book} from "../models/Book";
import {CD} from "../models/CD";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";

@Injectable()
export class MediaService {

  books: Book[] = [];
  books$ = new Subject<Book[]>();

  cds: CD[] = [];
  cds$ = new Subject<CD[]>();

  constructor(
    private storage: Storage
  ) {
    this.getMedia();
  }

  private getMedia() {
    this.storage.get('media').then(
      (list) => {
        if (list) {
          console.log(list);
          this.books = list.books.slice();
          this.cds = list.cds.slice();
        } else {
          console.error('No LIST in storage', list, list.length);
        }
        this.emitAll();
      }
    )
  }

  emitAll() {
    this.books$.next(this.books.slice());
    this.cds$.next(this.cds.slice());
  }

  getAllBooks() {
    this.getMedia();
    return this.books;
  }

  private saveMedia() {
    this.storage.set('media', {
      books: this.books,
      cds: this.cds
    });
    this.emitAll();
  }

  createBook(book: Book) {
    this.books.push(book);
    this.saveMedia();
  }

  createCd(Cd: CD) {
    this.cds.push(Cd);
    this.saveMedia();
  }

  updateBook(book: Book) {
    const index = this.books.findIndex((element) => {
      if (element === book) {
        return true;
      }
    });

    this.books[index] = book;
    this.saveMedia();
    this.emitAll();
  }

  updateCD(cd: CD) {
    const index = this.cds.findIndex((element) => {
      if (element === cd) {
        return true;
      }
    });

    this.cds[index] = cd;
    this.saveMedia();
    this.emitAll();
  }

  toggleLendStatus(scope: string, index: number) {
    if ('cd' === scope) {
      this.cds[index].isLent = !this.cds[index].isLent;
      this.updateCD(this.cds[index]);
    } else if ('book' === scope) {
      this.books[index].isLent = !this.books[index].isLent;
      this.updateBook(this.books[index]);
    } else {
      console.error('Le scope "' + scope + '" n\'est pas connu. Merci de choisir book ou cd.');
    }
  }

  addBorrower(scope: string, index: number, borrower: string) {
    if ('cd' === scope) {
      this.cds[index].borrower = borrower;
      this.updateCD(this.cds[index]);
    } else if ('book' === scope) {
      this.books[index].borrower = borrower;
      this.updateBook(this.books[index]);
    } else {
      console.error('Le scope "' + scope + '" n\'est pas connu. Merci de choisir book ou cd.');
    }
  }

  saveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('media').set({
        books: this.books,
        cds: this.cds
      }).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('media').once('value').then(
        (data: DataSnapshot) => {
          this.books = data.val().books;
          this.cds = data.val().cds;
          this.saveMedia();
          this.emitAll();
          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  fixtures() {
    this.books = [
      new Book('Un exemple de livre', 'Auteur de secours', 'Un illustre inconnu')
    ];
    this.cds = [
      new CD('Un exemple de CD', 'Interprète de secours', 'Un mélomane')
    ];
    this.saveMedia();
    this.emitAll();
  }

}
