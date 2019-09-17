export class CD {
  name: string;
  author: string;
  isLent: boolean;
  borrower: string;

  constructor(name: string, author: string, borrower?: string) {
    this.name = name;
    this.author = author;
    this.isLent = false;
    this.borrower = borrower;
  }

}
