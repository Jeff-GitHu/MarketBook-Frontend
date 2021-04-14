import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNewComponent } from './book-new.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit {
  displayColumns = ['title', 'description', 'author', 'price'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordering: MatSort;
  @ViewChild(MatPaginator) pagination: MatPaginator;


  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  todoFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  openDialog(){
    this.dialog.open(BookNewComponent)
  }
  ngOnInit(): void {
    this.dataSource.data = this.booksService.getBooks();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordering;
    this.dataSource.paginator = this.pagination
  }
}
