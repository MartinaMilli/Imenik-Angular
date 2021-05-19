import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  loginMode = true;
  hide = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      });
    }

  onSwitchToSignup(): void {
    this.loginMode = false;
    this.authForm.reset();
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.isLoading = true;

    if (this.loginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(responseData => {
      this.isLoading = false;
      this.router.navigate(['/my-contacts']);
      }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      this.snackBar.open(this.error, '', {duration: 3000});
      });

    this.authForm.reset();
    Object.keys(this.authForm.controls).forEach(key => {
      this.authForm.controls[key].setErrors(null);
    });
  }
}
