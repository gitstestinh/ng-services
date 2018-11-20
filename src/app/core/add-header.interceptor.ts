import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(`Add Header interceptor ran - ${req.url}`);

        const request: HttpRequest<any> = req.clone({
            setHeaders: { 'Content-Type': 'application/json'}
        });

        return next.handle(request);
    }
}
