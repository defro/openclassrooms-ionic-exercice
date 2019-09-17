export class MediaService {

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
      isLent: false
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

}
