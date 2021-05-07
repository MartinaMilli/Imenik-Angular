import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private contactService: ContactService){}
  
    ngOnInit(): void {
      this.contactService.fetchContacts();
      localStorage.setItem('Contacts', JSON.stringify([]));
  }
}
