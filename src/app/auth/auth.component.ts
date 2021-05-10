import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  loginMode = true;

  constructor() { }

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
    console.log('form submitted');
    this.authForm.reset();
  }

}
