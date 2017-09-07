import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Services
 */
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'bonamondo-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  @Input() params;

  errors: any = [];
  mdIcon: string;

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.params) {
      if(!this.params.route) {
        this.errors.push({
          cod: 'r-01'
        })
      }

      if(!this.params.mdIcon) {
        this.params.mdIcon = "exit_to_app"
      }
    } else {
      this.errors.push({
        cod: 'p-01'
      })
    }
  }

  logout = () => {
    this.authentication.logout();

    this.router.navigate([this.params.route])
  }
}
