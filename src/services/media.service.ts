export class MediaService {

  cds = [
    {
      name: "Thriller",
      author: "Michael Jackson",
      isLent: true
    },
    {
      name: "Legend",
      author: "Bob Marley and the Wailers",
      isLent: false
    },
    {
      name: "The Dark Side of the Moon",
      author: "Pink Floyd",
      isLent: true
    }
  ];

  books = [
    {
      name: "La Bible",
      author: "Dieu",
      isLent: true
    },
    {
      name: "Le Coran",
      author: "Allah",
      isLent: true
    },
    {
      name: "La Torah",
      author: "Yahvé",
      isLent: true
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
