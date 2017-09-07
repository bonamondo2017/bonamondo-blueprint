import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  paramsToLogin: any;

  constructor() { }

  ngOnInit() {
    this.paramsToLogin = {
      language: 'en-US', //Not required
      route: '/main' //required
    }
  }

}
