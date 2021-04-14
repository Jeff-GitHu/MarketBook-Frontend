import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent {
  @Input() titleBook: string;

  //Este evento emiter, me permite mandar como output al componente padre.
  @Output() libroClicked = new EventEmitter();

  constructor(private LibrosService: LibrosService) {}

  onClicked() {
    //Aqui emite el evento.
    //this.libroClicked.emit();
    this.LibrosService.deleteBook(this.titleBook);
  }
}
