import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Authors } from './authors.model';

@Injectable({
  providedIn: 'root',
}) // para que se use como provider en app.module.ts
export class AuthorsService {
  baseUrl = environment.baseUrl;

  /**
   *  Agregamos este escuchador para poder actualizar la data en tiempo real.
   */
  private authorsSubject = new Subject<Authors[]>();

  /**
   *
   */
  constructor(private http: HttpClient) {}

  private authorList: Authors[] = [];

  getAuthors() {
    this.http
      .get<Authors[]>(this.baseUrl + 'api/LibreriaAuthor')
      .subscribe((data) => {
        this.authorList = data;
        this.authorsSubject.next([...this.authorList]);
      });
  }

  getActualListener(){
    return this.authorsSubject.asObservable();
  }
}
