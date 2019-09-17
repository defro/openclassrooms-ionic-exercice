import DataSnapshot = firebase.database.DataSnapshot;
import firebase from "firebase";
import {Subject} from "rxjs";
import {Book} from "../models/Book";
import {CD} from "../models/CD";

export class MediaService {

  books$ = new Subject<Book[]>();
  cds$ = new Subject<CD[]>();

  cds = [
    {
      name: "Thriller",
      author: "Michael Jackson",
      isLent: true,
      borrower: "Bruno Mars"
    },
    {
      name: "Legend",
      author: "Bob Marley and the Wailers",
      isLent: false,
      borrower: ""
    },
    {
      name: "The Dark Side of the Moon",
      author: "Pink Floyd",
      isLent: true,
      borrower: "Un inconnu"
    }
  ];

  books = [
    {
      name: "La Bible",
      author: "Dieu",
      isLent: true,
      borrower: "Jésus"
    },
    {
      name: "Le Coran",
      author: "Allah",
      isLent: true,
      borrower: "Mahomet"
    },
    {
      name: "La Torah",
      author: "Yahvé",
      isLent: true,
      borrower: "Abraham"
    }
  ];

  toggleLendStatus(scope: string, index: number) {
    if ('cd' === scope) {
      this.cds[index].isLent = !this.cds[index].isLent;
    } else if ('book' === scope) {
      this.books[index].isLent = !this.books[index].isLent;
    } else {
      console.error('Le scope "' + scope + '" n\'est pas connu. Merci de choisir book ou cd.');
    }
  }

  addBorrower(scope: string, index: number, borrower: string) {
    if ('cd' === scope) {
      this.cds[index].borrower = borrower;
    } else if ('book' === scope) {
      this.books[index].borrower = borrower;
    } else {
      console.error('Le scope "' + scope + '" n\'est pas connu. Merci de choisir book ou cd.');
    }
  }

  emitBooks() {
    this.books$.next(this.books.slice());
    this.cds$.next(this.cds.slice());
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
          this.emitBooks();
          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }

}
