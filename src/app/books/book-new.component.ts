import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Authors } from '../authors/authors.model';
import { AuthorsService } from '../authors/authors.service';
import { BooksService } from './books.service';

/**
 * Listo Actualizado apuntando al Backend
 */
@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./books.component.css'],
})
export class BookNewComponent implements OnInit, OnDestroy {
  selectAuthor: string;
  selectAuthorText: string;
  publicDate: string;
  authors: Authors[] = [];

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  authorSubscription: Subscription;

  /**
   * Service Book
   * Dialog Material
   * Service Authors
   */
  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private authorServices: AuthorsService
  ) {}

  ngOnInit() {
    this.authorServices.getAuthors();
    this.authorSubscription = this.authorServices
      .getActualListener()
      .subscribe((authorsAPI: Authors[]) => {
        this.authors = authorsAPI;
      });
  }

  selected(event: MatSelectChange) {
    this.selectAuthorText = (event.source.selected as MatOption).viewValue;
  }

  saveBook(form: NgForm) {
    if (form.valid) {
      const authorRequest = {
        id: this.selectAuthor,
        completeName: this.selectAuthorText,
      };

      const bookRequest = {
        id: null,
        description: form.value.description,
        titulo: form.value.title,
        author: authorRequest,
        price: parseInt(form.value.price),
        datePublication: new Date(this.publicDate),
      };

      this.bookService.addBook(bookRequest);
      this.authorSubscription = this.bookService.addBookListeners().subscribe(() => {
        this.dialogRef.closeAll();
      });
    }
  }

  ngOnDestroy() {
    this.authorSubscription.unsubscribe();
  }
}
