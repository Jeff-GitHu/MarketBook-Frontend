import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { StartComponent } from './start.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';


//Providers
import { SecurityRouter } from './security/security.router';

const routes: Routes = [
  { path: '', component: StartComponent, canActivate: [SecurityRouter] },
  { path: 'Libros', component: LibrosComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Books', component: BooksComponent },
  { path: 'Authors', component: AuthorsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityRouter],
})
export class AppRoutingModule {}
