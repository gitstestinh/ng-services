import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookTrackerError } from 'app/models/bookTrackerError';

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
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const resolvedData: Book[] | BookTrackerError = this.activatedRoute.snapshot.data['resolvedBooks'];

    if (resolvedData instanceof BookTrackerError) {
      console.log('Error');
    }
    else {
      this.allBooks = resolvedData;
    }

    this.dataService.getAllReaders().subscribe(
      (data: Reader[]) => this.allReaders = data,
      (err: BookTrackerError) => console.log(err.friendlyMessage)
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
