import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  activeMode = 'details';
  currentId: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onEditClick(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
