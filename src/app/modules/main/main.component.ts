import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  paramsToLogout: any;
  paramsToMenu: any;
  title: string = "BonamMondo";

  constructor() { }

  ngOnInit() {
    this.paramsToLogout = {
      route: "/login"
    }

    this.paramsToMenu = {
      menuSettings: [{
        description: "Tópicos",
        route: ['/main/topic']
      }, {
        description: "Delegações",
        route: ['/main/delegation']
      }, {
        description: "Grupos de Ocupações",
        route: ['/main/occupation-group']
      }, {
        description: "Instituições",
        route: ['/main/institution']
      }, {
        description: "Ocupações",
        route: ['/main/occupation']
      }]
    }
  }

}
