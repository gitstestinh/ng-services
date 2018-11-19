import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook'
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    const bookId: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookId)
    .subscribe(
      (data: Book) => this.selectedBook = data,
      (err: any) => console.log(err),
    );

    this.dataService.getOldBookById(bookId).subscribe();
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook).subscribe(
      val => this.router.navigate(['/dashboard']),
      (err: any) => console.log(err)
    );
  }
}
