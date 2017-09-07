import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Services
 */
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'bonamondo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() params;

  errors: any = [];
  loginForm: FormGroup;
  placeholderEmail: string;
  placeholderPassword: string;
  submitButton: string;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    public snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    /**
     * Errors checking: start
     */
    if(this.params) {
      if(!this.params.route) {
        this.errors.push({
          cod: 'r-01'
        })
      }

      if(!this.params.language) {
        this.placeholderEmail = "E-mail";
        this.placeholderPassword = "Password";
        this.submitButton = "Login";
      } else {
        if(this.params.language == 'pt-BR') {
          this.placeholderEmail = "E-mail";
          this.placeholderPassword = "Senha";
          this.submitButton = "Entrar";
        } else {
          this.placeholderEmail = "E-mail";
          this.placeholderPassword = "Password";
          this.submitButton = "Login";
        }
      }
    } else {
      this.errors.push({
        cod: 'p-01'
      })
    }
    /**
     * Errors checking: end
     */

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  login = () => {
    this.authentication
    .login(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .then(res => {
      if(res == "Success") {
        this.router.navigate([this.params.route])
      } else {
        this.snackbar.open(res['message'], '', {duration: 5000})
      }
    })
  }
}
