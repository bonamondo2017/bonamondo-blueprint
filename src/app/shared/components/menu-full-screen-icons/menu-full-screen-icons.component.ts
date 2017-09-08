import { Component, Input, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { Router } from '@angular/router';

import { fbAuth } from './../../../../environments/firebase-authentication-config';

/**
 * Services
 */
import { AuthenticationService } from './../../services/authentication.service';
import { CrudService } from './../../services/crud.service';

@Component({
  selector: 'bonamondo-menu-full-screen-icons',
  animations: [ trigger(
    'myAnimation',[
      transition(
        ':enter',[
          style({top: '-100%',left: '-100%', opacity: 0}),
          animate('1000ms')
        ]
      )
    ]
  )],
  templateUrl: './menu-full-screen-icons.component.html',
  styleUrls: ['./menu-full-screen-icons.component.css']
})
export class MenuFullScreenIconsComponent implements OnInit {
  @Input() params;

  uid: string;

  errors: any = [];
  menuOpened: boolean = false;
  menuIcons: any;

  constructor(
    private crud: CrudService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    fbAuth.onAuthStateChanged(res => {
      this.uid = res['uid'];
      this.crud.read({
        route: 'menuFullScreenIcons',
        order: 'uid',
        equalTo: this.uid
      })
      .then(res=> {
        this.menuIcons = res[0];
      })
    })
    
    if(this.params) {
      if(!this.params.mdIconToMenuTrigger) {
        this.params.mdIconToMenuTrigger = "menu";
      }
    } else {
      this.errors.push({
        cod: 'p-01'
      })
    }
  }

  navigate = (route) => {
    this.router.navigate([route]);
  }

  toggleMenu = () => {
    this.menuOpened = !this.menuOpened;
  }
}
