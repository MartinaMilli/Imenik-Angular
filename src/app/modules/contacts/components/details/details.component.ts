import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  activeMode = 'details';
  currentId: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  onEditClick(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
