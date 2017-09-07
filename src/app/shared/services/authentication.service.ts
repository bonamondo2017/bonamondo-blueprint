import { Injectable } from '@angular/core';

import { fbAuth } from './../../../environments/firebase-authentication-config';

@Injectable()
export class AuthenticationService {

  constructor() { }

  login = (email, password) => new Promise((resolve) => {
    fbAuth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      resolve(error)
    })
    .then(res => {
      resolve("Success")
    })
  })

  logout = () => {
    fbAuth.signOut();
  }
}
