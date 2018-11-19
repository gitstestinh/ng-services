import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
              private router: Router) { }

  ngOnInit() {
    this.dataService.getAllBooks().subscribe(
      (data: Book[]) => this.allBooks = data,
      (err: any) => console.log(err),
      () => console.log('all done')
    );
    this.dataService.getAllReaders().subscribe(
      (data: Reader[]) => this.allReaders = data,
      (err: any) => console.log(err)
    );
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID).subscribe(
      val => {
        const index: number = this.allBooks.findIndex(book => book.bookID === bookID);
        this.allBooks.splice(index);
      },
      (err: any) => console.log(err)
    );
  }

  deleteReader(readerID: number): void {
    this.dataService.deleteReader(readerID).subscribe(
      val => {
        const index: number = this.allReaders.findIndex(reader => reader.readerID === readerID);
        this.allReaders.splice(index);
      },
      (err: any) => console.log(err)
    );
  }
}
