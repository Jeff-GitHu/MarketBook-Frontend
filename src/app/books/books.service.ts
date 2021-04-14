import { Books } from './books.model';

export class BooksService {

  private booksList: Books[] = [
    {
      bookId: 1,
      title: 'Algoritmos',
      description: 'Libro Basico',
      author: 'Jeffrey Herrera',
      price: 18,
    },
    {
      bookId: 2,
      title: 'Angular',
      description: 'Libro Intermedio',
      author: 'Heli Arcila',
      price: 25,
    },
    {
      bookId: 3,
      title: 'ASP.Net',
      description: 'Master',
      author: 'Juan Arevalo',
      price: 30,
    },
    {
      bookId: 4,
      title: 'Java',
      description: 'Agile Libro',
      author: 'John Ortiz',
      price: 99,
    },
  ];

  getBooks(){
    return this.booksList.slice();
  }

}
