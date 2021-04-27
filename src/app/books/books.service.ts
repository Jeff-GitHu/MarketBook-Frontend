import { Subject } from 'rxjs';
import { Books } from './books.model';
import { environment } from '../../environments/environment';
import { PaginationBooks } from './pagination-books.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.baseUrl;

  private booksList: Books[] = [];
  bookSubject = new Subject();

  bookPagination: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  /**
   *
   */
  constructor(private http: HttpClient) {}

  getBooks(
    bookByPage: number,
    actualPage: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ) {
    const request = {
      pageSize: bookByPage,
      page: actualPage,
      sort,
      sortDirection,
      filterValue,
    };

    this.http
      .post<PaginationBooks>(this.baseUrl + 'api/Libro/pagination', request)
      .subscribe((response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }

  getActualBooks() {
    /*Cada vez que se refresque mi componente, se actualiza con nueva data del server*/
    return this.bookPaginationSubject.asObservable();
  }

  addBook(book: Books) {
    this.http.post(this.baseUrl + 'api/Libro', book).subscribe((response) => {
      this.bookSubject.next();
    });
  }

  addBookListeners(){
    return this.bookSubject.asObservable();
  }
}
