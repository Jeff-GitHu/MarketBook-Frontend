import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNewComponent } from './book-new.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination-books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  timeout: any = null;
  displayColumns = ['titulo', 'description', 'author', 'price'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordering: MatSort;
  @ViewChild(MatPaginator) pagination: MatPaginator;

  private bookSubscription: Subscription;

  totalBooks = 0;
  booksByPage = 2;
  pageCombo = [1, 2, 5, 10];
  actualPage = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = null;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}
  /*
  *Este evento paginador me permite actualizar la data referente a la pagina actual y tambien los libros por pagina que actualice el usuario
  */
  eventPagination(event: PageEvent): void {
    this.booksByPage = event.pageSize;
    this.actualPage = event.pageIndex + 1;
    this.booksService.getBooks(
      this.booksByPage,
      this.actualPage,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  orderColumns(event): void {
    this.booksService.getBooks(
      this.booksByPage,
      this.actualPage,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  ngOnInit(): void {
    this.booksService.getBooks(
      this.booksByPage,
      this.actualPage,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.bookSubscription = this.booksService
      .getActualBooks()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalBooks = pagination.totalRows;
      });
  }

  toDoFilter(event: any): void {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value,
        };

        $this.filterValue = filterValueLocal;

        $this.booksService.getBooks(
          $this.booksByPage,
          $this.actualPage,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      }
    }, 1000);
  }

  openDialog() {
    const dialogRef = this.dialog.open(BookNewComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.booksService.getBooks(
        this.booksByPage,
        this.actualPage,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordering;
    this.dataSource.paginator = this.pagination;
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
