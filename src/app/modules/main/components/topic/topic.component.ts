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
  addToRelatedTopic: boolean = false;
  mainForm: FormGroup;
  objectFromUpdate: any = [];
  paramToSearch: any;
  paramsToTableData: any;
  relatedTopics: any;
  relatedTopicsFiltered: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  title: string;
  relatedTopicsFromMultipleSelectObject: any = [];

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
        this.title = "Change Topic Data";
        this.submitButton = "Update";

        this.crud.read({
          route: 'topics/'+this.paramToSearch.replace(':', '')
        }).then(res => {
          let obj = res;
          for(let lim = obj['related_topics'].length, i = 0; i < lim; i++){
            this.objectFromUpdate.push(obj['related_topics'][i].related_topics);
          }
          this.mainForm.get('name').setValue(obj['name']);
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "New Topic";
        this.submitButton = "Create";
      }
    })
    /*update end*/

    /**
     * Select options start
     */
    this.crud.read({
      route: 'topics',
      order: ['__key', 'desc']
    })
    .then(res => {
      this.relatedTopics = res;
      this.relatedTopicsFiltered = res;
    })
    /**
     * Select options end
     */

    this.mainForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'related_topics': new FormArray([]),
      'related_topics_name': new FormControl(null)
    });

    this.makeList();
  }

  makeList = () => {
    this.paramsToTableData = {
      toolbar: {
        title: "Topics List",
        delete: "__key",
        search: true
      },
      list: {
        route: "topics",
        show: ['name'],
        header: ['Topic'],
        order: ['id', 'desc'],
        edit: {route: '/main/topic/', param: '__key'},
        source: true
      },
      actionToolbar: {
        language: 'en-us'
      }
    };
  }

  onSubmit = () => {
    if(this.submitToUpdate) {
      let object = this.mainForm.value;

      let params = {
        route: 'topics',
        objectToUpdate: object,
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
    } else {
      let object = this.mainForm.value;

      let params = {
        route: 'topics',
        object: object
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
    }

    this.mainForm.reset();

    this.makeList();
  }

  multipleSelectOutputHandler(event){
    for(let lim = event.length, i = 0; i < lim; i++){
      if(i == lim - 1){
        let control = new FormGroup({
          related_topics: new FormControl(event[i])
        });
        (<FormArray>this.mainForm.get('related_topics')).push(control);
      }
    }
  }
}
