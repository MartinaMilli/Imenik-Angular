import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../modules/contacts/models/user.model';


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    // gives the user access to the previously emitted value, even if the user didn't subscribe at the point of emitting that value
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    loggedIn = false;

    constructor(
        private http: HttpClient,
        private router: Router){}

    signUp(userEmail: string, userPassword: string): Observable<any> {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqSmQiDKRIOP4FdiyVBj-LnIGftott_Ic',
            {
                email: userEmail,
                password: userPassword,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }));
    }

    autoLogin(): void {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpDate));

        // true if the token is valid
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logIn(userEmail: string, userPassword: string): Observable<any>{
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqSmQiDKRIOP4FdiyVBj-LnIGftott_Ic',
            {
                email: userEmail,
                password: userPassword,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }));
    }

    autoLogout(expirationDuration: number): void {
        // timer for autologout
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    logOut(): void {
        this.user.next(null);
        this.router.navigate(['']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse): Observable<any> {
        let errMessage = 'Došlo je do pogreške!';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errMessage = 'E-mail adresa već postoji!';
                break;
            case 'INVALID_PASSWORD':
            case 'EMAIL_NOT_FOUND':
                errMessage = 'Neispravna e-mail adresa ili lozinka!';
                break;
        }
        return throwError(errMessage);
    }

    sendPasswordResetCode(email: string) {
        return this.http.post<{email: string}>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBqSmQiDKRIOP4FdiyVBj-LnIGftott_Ic', {
            requestType: 'PASSWORD_RESET',
            email: email
        }).pipe(
            catchError(this.handleError));
    }
}
