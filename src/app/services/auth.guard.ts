
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class  AuthGuart implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean | UrlTree> {
            return this.authService.user.pipe(map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                this.router.navigate([this.router.url]);
                return false;
            }));
    }
}
