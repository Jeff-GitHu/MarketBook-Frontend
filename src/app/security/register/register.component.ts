import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(private SecurityService: SecurityService) {}

  ngOnInit(): void {}

  registerUser(form: NgForm) {
    this.SecurityService.registerUser({
      email: form.value.email,
      password: form.value.password,
      lastnames: form.value.lastnames,
      name: form.value.name,
      username: form.value.username,
      userId: '',
    })
  }
}
