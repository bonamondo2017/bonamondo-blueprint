import { Component, Input, OnInit } from '@angular/core';

import { CrudService } from './../../services/crud.service';
import { fbAuth } from './../../../../environments/firebase-authentication-config';

@Component({
  selector: 'bonamondo-menu-full-screen-icons',
  templateUrl: './menu-full-screen-icons.component.html',
  styleUrls: ['./menu-full-screen-icons.component.css']
})
export class MenuFullScreenIconsComponent implements OnInit {
  @Input() params;

  uid: string;

  errors: any = [];
  menuOpened: boolean = false;

  constructor(private crud: CrudService) { }

  ngOnInit() {
    fbAuth.onAuthStateChanged(res => this.uid = res['uid'])
    console.log(this.uid)

    this.crud.read({route: 'menuFullScreenIcons'})
    .then(res=>console.log(res))
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

  toggleMenu = () => {
    this.menuOpened = !this.menuOpened;
  }
}