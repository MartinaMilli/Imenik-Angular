import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetForm: FormGroup;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }

  onSubmit(): void {
    console.log(this.resetForm.value.email);
    this.authService.sendPasswordResetCode(this.resetForm.value.email).subscribe(email => {
      this.snackBar.open('Poveznica je poslana na vašu e-mail adresu!', '', {duration: 2000});
    }, errorMessage => {
      this.snackBar.open(errorMessage, '', {duration: 3000});
    });
    setTimeout(() => this.router.navigate(['auth']), 2000);
  }
}
