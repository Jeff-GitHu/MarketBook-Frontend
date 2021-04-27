import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Authors } from './authors.model';
import { AuthorsService } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  displayColumns = ['firstname', 'lastname', 'academicGrade'];
  dataSource = new MatTableDataSource<Authors>();

  private authorSubscription: Subscription;

  constructor(private authorService: AuthorsService) {}

  ngOnInit(): void {
    this.authorService.getAuthors();
    this.authorSubscription = this.authorService.getActualListener().subscribe((authors: Authors[]) => {
      this.dataSource.data = authors;
    });
  }

  ngOnDestroy(){
    this.authorSubscription.unsubscribe();
  }
}
