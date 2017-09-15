import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/crud.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  array: any;
  mainForm: FormGroup;
  isForeign: boolean = false;
  paramToSearch: any;
  paramsToTableData: any;
  relatedTopics: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  title: string;

  constructor(
    private crud: CrudService,
    private mdsnackbar: MdSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /*update start*/
    this.route.params.subscribe(params => {
      if(params.id) {
        this.paramToSearch = params.id;
        this.submitToCreate = false;
        this.submitToUpdate = true;
        this.title = "Alterar Dados do Tópico";
        this.submitButton = "Atualizar";

        this.crud.read({
          route: 'topics/'+this.paramToSearch.replace(':', '')
        }).then(res => {     
          let obj = res;
          
          this.mainForm.get('name').setValue(obj['name']);
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "Novo Tópico";
        this.submitButton = "Salvar";
      }
    })
    /*update end*/

    this.crud.read({
      route: 'topics',
      order: ['__key', 'desc']
    })
    .then(res => {
      this.relatedTopics = res;
    })

    this.mainForm = new FormGroup({
      'name': new FormControl(null),
      'related_topic': new FormControl(null)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Lista de tópicos",
        delete: "__key",
        search: true
      },
      list: {
        route: "topics",
        show: ['name'],
        header: ['Tópico'],
        order: ['id', 'desc'],
        edit: {route: '/main/topic/', param: '__key'},
        source: true
      },
      actionToolbar: {
        language: 'pt-br'
      }
    };
  }

  onChangeForeigntopic = (events) => {
    this.mainForm.get('is_foreign').setValue(events.checked);
  }

  onSubmit = () => {
    if(this.submitToUpdate) {
      let params = {
        route: 'topics',
        objectToUpdate: this.mainForm.value,
        paramToUpdate: this.paramToSearch.replace(':', '')
      };
  
      this.crud.update(params)
      .then(res => {
        this.mdsnackbar.open(res['message'], '', {
          duration: 2000
        })
      }, rej => {
        this.mdsnackbar.open(rej['message'], '', {
          duration: 3000
        })
      })
  
      this.router.navigate(['/main/topic']);
  
      this.makeList();
    } else {
      let params = {
        route: 'topics',
        object: this.mainForm.value
      };

      this.crud.create(params)
      .then(res => {
        this.mdsnackbar.open(res['message'], '', {
          duration: 2000
        })
      }, rej => {
        this.mdsnackbar.open(rej['message'], '', {
          duration: 3000
        })
      })

      this.mainForm.get('name').setValue(null);

      this.makeList();
    }
  }
}
