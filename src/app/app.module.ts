import { NgModule } from '@angular/core';
//declarations
import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { LibroComponent } from './libro/libro.component';
import { LibrosComponent } from './libros/libros.component';
import { StartComponent } from './start.component';

import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { BarComponent } from './navigation/bar/bar.component';
import { MenuListComponent } from './navigation/menu-list/menu-list.component';

//imports
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookNewComponent } from './books/book-new.component';

//providers
import { LibrosService } from './services/libros.service';
import { SecurityService } from './security/security.service';
import { BooksComponent } from './books/books.component';
import { BooksService } from './books/books.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LibrosComponent,
    LibroComponent,
    StartComponent,
    RegisterComponent,
    LoginComponent,
    BarComponent,
    MenuListComponent,
    BooksComponent,
    BookNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [LibrosService, SecurityService, BooksService],
  bootstrap: [AppComponent],
  entryComponents: [BookNewComponent],
})
export class AppModule {}
