import { Component, OnInit } from '@angular/core';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit {

  constructor(private bookService: DataService, private router: Router) { }

  ngOnInit() { }

  saveBook(formValues: any): void {
    const newBook: Book = <Book>formValues;
    newBook.bookID = 0;
    this.bookService.addBook(newBook).subscribe(
      (data: Book) => this.router.navigate(['/dashboard']),
      (err: any) => console.log(err)
    )
  }
}
