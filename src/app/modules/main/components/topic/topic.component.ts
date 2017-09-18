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
  formAutocompleteMultipleObject: any = [];
  mainForm: FormGroup;
  paramsToFormAutocompleteMultiple: any;
  paramToSearch: any;
  paramsToTableData: any;
  relatedTopics: any;
  showFormAutocompleteMultiple: boolean = false;
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
        this.title = "Change Topic Data";
        this.submitButton = "Update";

        this.crud.read({
          route: 'topics/'+this.paramToSearch.replace(':', '')
        }).then(res => {
          let obj = res;

          if(res['relatedTopics']) {
            this.formAutocompleteMultipleObject.push(res['relatedTopics'][0]);
            
            this.makeFormAutocompleteMultiple();            
            this.showFormAutocompleteMultiple = true;
          } else {
            this.makeFormAutocompleteMultiple();            
            this.showFormAutocompleteMultiple = true;
          }

          this.mainForm.get('name').setValue(obj['name']);
        })
      } else {
        this.submitToCreate = true;
        this.submitToUpdate = false;
        this.title = "New Topic";
        this.submitButton = "Create";

        this.makeFormAutocompleteMultiple();            
        this.showFormAutocompleteMultiple = true;
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
    })
    /**
     * Select options end
     */

    this.mainForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'related_topic': new FormControl(null)
    });

    this.makeList();
  }

  handleFormAutocompleteMultipleOutput = (event) => {
    this.formAutocompleteMultipleObject = [];
    this.formAutocompleteMultipleObject.push(event);
  }

  makeFormAutocompleteMultiple = () => {
    console.log(this.formAutocompleteMultipleObject)
    this.paramsToFormAutocompleteMultiple = {
      source: 'firebase',
      route: 'topics',
      order: 'name',
      description: 'name',
      value: '__key',
      placeholder: 'Related Topics',
      update: this.formAutocompleteMultipleObject
    }
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
    } else {
      let object = this.mainForm.value;
      object.relatedTopics = this.formAutocompleteMultipleObject;

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
    
    this.makeFormAutocompleteMultiple();
    this.makeList();
  }
}
