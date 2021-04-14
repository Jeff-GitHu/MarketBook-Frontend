import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {

  displayColumns = ['title', 'description', 'author', 'price'];
  dataSource = new MatTableDataSource<Books>();
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.dataSource.data= this.booksService.getBooks();
  }
}
