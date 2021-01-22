import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  singinMode = false;

  ngOnInit() {
  }

  togleMode() {
    this.singinMode = !this.singinMode;
  }

  OnSubmit(form:NgForm) {
    if (this.singinMode) {
      this.authService.singIn(form.value.email, form.value.password).subscribe( res => {
        this.router.navigate(['items'])
      });
    } else {
      this.authService.login(form.value.email, form.value.password).subscribe( res => {
        this.router.navigate(['items'])
      });
    }
  }
}
