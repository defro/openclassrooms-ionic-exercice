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

  toggleBookLendStatus(index: number) {
    this.books[index].isLent = !this.books[index].isLent;
  }

  toggleCDLendStatus(index: number) {
    this.cds[index].isLent = !this.cds[index].isLent;
  }

}
