//Subject para LibrosSubject, para un refresh al agregar uno.
import { Subject } from 'rxjs';

export class LibrosService {
  LibrosSubject = new Subject();
  private Libros = [
    'Libro de Jeffrey',
    'Libro de Aritmetica',
    'El grafico revista',
  ];

  getBooks() {
    return [...this.Libros];
  }

  addBook(nameBook: string) {
    this.Libros.push(nameBook);
    //Refresca la lista
    this.LibrosSubject.next();
  }

  deleteBook(nameBook: string) {
    this.Libros = this.Libros.filter((x) => x !== nameBook);
    this.LibrosSubject.next();
  }
}
