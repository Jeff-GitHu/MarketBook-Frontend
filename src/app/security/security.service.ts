import { Subject } from 'rxjs';
import { User } from './user.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SecurityService {
  /**
   *
   */
  constructor(private router: Router) {}

  securityChange = new Subject<boolean>();
  private user: User;

  registerUser(usr: User) {
    this.user = {
      email: usr.email,
      userId: Math.round(Math.random() * 10000).toString(),
      name: usr.name,
      lastnames: usr.lastnames,
      username: usr.username,
      password: usr.password,
    };

    this.securityChange.next(true);
    this.router.navigate(['/'])
  }

  login(loginData: LoginData) {
    this.user = {
      email: loginData.email,
      password: loginData.password,
      userId: Math.round(Math.random() * 10000).toString(),
      name: '',
      lastnames: '',
      username: '',
    };

    this.securityChange.next(true);
    this.router.navigate(['/'])
  }

  getUser() {
    return { ...this.user };
  }

  logout() {
    this.user = null;
    this.securityChange.next(false);
    this.router.navigate(['Login'])
  }

  onSesion(){
    return this.user != null
  }
}
