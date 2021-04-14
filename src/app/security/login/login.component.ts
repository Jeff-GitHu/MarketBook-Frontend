import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {z

  constructor(private SecurityService: SecurityService) { }

  ngOnInit(): void {
  }

  loginUser(form: NgForm){
    this.SecurityService.login({
      email:form.value.email,
      password: form.value.password
    })
  }

}
