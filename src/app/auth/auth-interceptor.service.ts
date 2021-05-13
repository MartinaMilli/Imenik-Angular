import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService){}


    // add user token and user id to all outgoing requests
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    url: [req.url.slice(0, 48), '/', user.id, req.url.slice(48)].join(''),
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
