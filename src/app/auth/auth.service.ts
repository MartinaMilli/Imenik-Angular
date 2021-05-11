import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ContactService } from '../contact.service';
import { User } from './user.model';


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

    constructor(
        private http: HttpClient,
        private contactService: ContactService,
        private router: Router){}

    signUp(email: string, password: string): Observable<any> {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqSmQiDKRIOP4FdiyVBj-LnIGftott_Ic',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }));
    }

    logIn(email: string, password: string): Observable<any>{
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqSmQiDKRIOP4FdiyVBj-LnIGftott_Ic',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    // fetch contacts
                    this.contactService.fetchContacts();
                }));
    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate);
        this.user.next(user);
    }

    private handleError(errorResponse: HttpErrorResponse): Observable<any> {
        let errMessage = 'An error occured!';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errMessage = 'This e-mail address already exists';
                break;
            case 'INVALID_PASSWORD':
            case 'EMAIL_NOT_FOUND':
                errMessage = 'Invalid e-mail or password!';
                break;
        }
        return throwError(errMessage);
    }
}
