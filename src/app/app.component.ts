import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './contacts/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    // keep user logged in after app reload
    this.authService.autoLogin();

    // ako postoji prijavljen korisnik, automatski navigirati na stranicu s kontaktima
    if (localStorage.getItem('userData')) {
      this.router.navigate(['my-contacts'])
    }
  }

}
