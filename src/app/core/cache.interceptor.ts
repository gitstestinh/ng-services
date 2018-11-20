import { Injectable } from '@angular/core';
import { HttpResponse, HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpCacheService } from './http-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if (req.method !== 'GET') {
           console.log(`Invalidated cache: ${req.method} ${req.url}`)
           this.cacheService.invalidateCache();
           return next.handle(req);
       }

       const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

       if (cachedResponse) {
           console.log(`Returning cached response: ${req.method} ${req.url}`);
           console.log(cachedResponse);
           return of(cachedResponse);
       }

       return next.handle(req)
       .pipe(
           tap(response => {
               if (response instanceof HttpResponse) {
                console.log(`Adding item to cache: ${req.method} ${req.url}`);
                this.cacheService.put(req.url, response);
               }
           })
       )

    }
}
