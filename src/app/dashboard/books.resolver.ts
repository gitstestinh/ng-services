import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { Book } from 'app/models/book';

@Injectable()
export class BooksResolver implements Resolve<Book[] | BookTrackerError> {
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
        console.log('Resolving...');
        return this.dataService.getAllBooks()
        .pipe(
            catchError(err => of(err))
        );
    }
}
