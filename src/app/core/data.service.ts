import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable} from 'rxjs/Observable'
import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { ErrorObservable} from 'rxjs/observable/ErrorObservable';
import { map, tap, catchError} from 'rxjs/operators'

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService, private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>('/api/readers', { headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  getReaderById(id: number): Observable<Reader | BookTrackerError> {
    return this.http.get<Reader>(`/api/readers/${id}`, { headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'})})
  }

  addReader(reader: Reader): Observable<Reader | BookTrackerError> {
    return this.http.post<Reader>(`/api/readers`, reader, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  updateReader(reader: Reader): Observable<void | BookTrackerError> {
    return this.http.put<void>(`/api/readers/${reader.readerID}`, reader , { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  deleteReader(readerId: number): Observable<void | BookTrackerError> {
    return this.http.delete<void>(`/api/readers/${readerId}`, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})} )
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
    };

  getBookById(id: number): Observable<Book | BookTrackerError> {
    return this.http.get<Book>(`/api/books/${id}`, { headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  getOldBookById(id: number): Observable<OldBook | BookTrackerError> {
    return this.http.get<Book>(`/api/books/${id}`, { headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        map(book => <OldBook>{
          bookTitle: book.title,
          year: book.publicationYear
        }),
         tap(value => console.log(value)),
         catchError(err => this.handleHttpError(err))
      );
  }

  addBook(book: Book): Observable<Book | BookTrackerError> {
    return this.http.post<Book>('/api/books', book, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  updateBook(book: Book): Observable<void | BookTrackerError> {
    return this.http.put<void>(`/api/books/${book.bookID}`, book, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  deleteBook(bookId: number): Observable<void | BookTrackerError> {
    return this.http.delete<void>(`/api/books/${bookId}`, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-token'})})
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    const dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured when getting data'

    return ErrorObservable.create(dataError);
  }
}
