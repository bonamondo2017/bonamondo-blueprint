import { Component, Input, OnInit, trigger, transition, keyframes, style, animate, state } from '@angular/core';
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
          animate(500, keyframes([
            style({'height': '100px','width': '100px','border-radius': '50%','margin': 'auto',top: '40%',left: '40%', opacity: 0, offset: 0}),
            style({'height': '30%','width': '30%','border-radius': '100%','margin': 'auto',top: '30%',left: '35%', opacity: 0.2, offset: 0.2}),
            style({'height': '50%','width': '50%','border-radius': '100%','margin': 'auto',top: '20%',left: '25%', opacity: 0.4, offset: 0.4}),
            style({'height': '70%','width': '70%','border-radius': '100%','margin': 'auto',top: '10%',left: '15%', opacity: 0.6, offset: 0.6}),
            style({'height': '85%','width': '85%','border-radius': '100%','margin': 'auto',top: '5%',left: '7%', opacity: 0.8, offset: 0.8}),
            style({'height': '95%','width': '95%','border-radius': '100%','margin': 'auto',top: '2%',left: '2%', opacity: 1, offset: 1})

          ]))
        ]
      ),
      transition(':leave',[
        animate(500, keyframes([
          style({'height': '95%','width': '95%','border-radius': '100%','margin': 'auto',top: '2%',left: '2%', opacity: 1, offset: 0}),
          style({'height': '85%','width': '85%','border-radius': '100%','margin': 'auto',top: '5%',left: '7%', opacity: 0.8, offset: 0.2}),
          style({'height': '70%','width': '70%','border-radius': '100%','margin': 'auto',top: '10%',left: '15%', opacity: 0.6, offset: 0.4}),
          style({'height': '50%','width': '50%','border-radius': '100%','margin': 'auto',top: '20%',left: '25%', opacity: 0.4, offset: 0.6}),
          style({'height': '30%','width': '30%','border-radius': '100%','margin': 'auto',top: '30%',left: '35%', opacity: 0.2, offset: 0.8}),
          style({'height': '100px','width': '100px','border-radius': '50%','margin': 'auto',top: '40%',left: '40%', opacity: 0, offset: 1})
        ]))
      ])
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
