import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
})
export class LibrosComponent implements OnInit, OnDestroy {
  //Libros = ['Matematica 1', 'Algoritmos Basico', 'Algebra Nivel Básico'];
  Libros = [];

  constructor(private LibrosService: LibrosService) {
    //this.Libros = LibrosService.getBooks();
  }

  private LibrosSubscription: Subscription;

  //Se usa ngOnInit en vez del constructor
  ngOnInit() {
    this.Libros = this.LibrosService.getBooks();
    //Escuchador, para actualizar la lista en el lado del cliente
    this.LibrosSubscription = this.LibrosService.LibrosSubject.subscribe(() => {
      this.Libros = this.LibrosService.getBooks();
    });
  }
  //Para ya no estar subscrito, cuando el componente ya no esta montado
  ngOnDestroy() {
    this.LibrosSubscription.unsubscribe();
  }

  deleteBook(Libro) {
    //this.Libros = this.Libros.filter((p) => p !== Libro);
  }

  saveBook(f) {
    if (f.valid) {
      //this.Libros.push(f.value.nameBook)
      this.LibrosService.addBook(f.value.nameBook);
    }
  }
}
