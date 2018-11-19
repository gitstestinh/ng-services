import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable} from 'rxjs/Observable'
import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { map, tap} from 'rxjs/operators'

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService, private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>('/api/readers', { headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'})});
  }

  getReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`/api/readers/${id}`, { headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'})})
  }

  addReader(reader: Reader): Observable<Reader> {
    return this.http.post<Reader>(`/api/readers`, reader, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})})
  }

  updateReader(reader: Reader): Observable<void> {
    return this.http.put<void>(`/api/readers/${reader.readerID}`, reader , { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})})
  }

  deleteReader(readerId: number): Observable<void> {
    return this.http.delete<void>(`/api/readers/${readerId}`, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})} )
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`, { headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'})});
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`, { headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        map(book => <OldBook>{
          bookTitle: book.title,
          year: book.publicationYear
        }),
         tap(value => console.log(value))
      );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', book, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})} )
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${book.bookID}`, book, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})} )
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookId}`, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})} )
  }
}
