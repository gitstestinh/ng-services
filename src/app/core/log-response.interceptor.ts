import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(`Log response interceptor ran - ${req.url}`);
        return next.handle(req)
        .pipe(
            tap(response => {
                if (response.type === HttpEventType.Response) {
                    console.log(response.body);
                }
            })
        )
    }
}
